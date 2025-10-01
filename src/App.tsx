import { ReviewItem, ReviewCategory } from "../types";

// This function communicates with the local ai.sh backend
export const reviewCode = async (code: string, focusAreas: string[]): Promise<ReviewItem[]> => {
    
    const focusInstruction = focusAreas.length > 0
        ? `The user wants to focus on: ${focusAreas.join(', ')}.`
        : 'Perform a comprehensive review.';

    // This is the powerful prompt we send to our local AGI
    const commandForAI = `
        You are an expert code reviewer. Your task is to analyze the provided code snippet and return your feedback as a JSON array of objects.
        ${focusInstruction}

        For each issue you find, provide:
        - A "category" from this enum: ${Object.values(ReviewCategory).join(', ')}.
        - The "line" number where the issue occurs. Use null for general comments.
        - A concise "comment" in GitHub-flavored markdown.

        Your entire final output MUST be only the raw, valid JSON array and nothing else. Do not include any other text, reasoning, or markdown backticks around the JSON.

        Here is the code to review:
        \`\`\`
        ${code}
        \`\`\`
    `;

    try {
        const response = await fetch('/api/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: commandForAI })
        });

        if (!response.ok) {
            throw new Error(`Backend server responded with status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(`AI Backend Error: ${result.output}`);
        }
        
        // The output from ai.sh might contain the [FINAL_ANSWER] tag. We need to clean it.
        const cleanOutput = result.output.replace(/\[FINAL_ANSWER\]/g, '').trim();
        
        // Find the start and end of the JSON array
        const jsonStart = cleanOutput.indexOf('[');
        const jsonEnd = cleanOutput.lastIndexOf(']');
        
        if (jsonStart === -1 || jsonEnd === -1) {
            console.error("Raw AI Output:", cleanOutput);
            throw new Error("AI did not return a valid JSON array. Check the console for raw output.");
        }

        const jsonString = cleanOutput.substring(jsonStart, jsonEnd + 1);
        const reviewData = JSON.parse(jsonString);

        if (!Array.isArray(reviewData)) {
            throw new Error("AI response was not a JSON array.");
        }

        return reviewData as ReviewItem[];

    } catch (error) {
        console.error("Error communicating with the AI backend:", error);
        if (error instanceof Error) {
            throw new Error(`AI Service Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the AI Service.");
    }
};
