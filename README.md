import React from 'react';
import { Code } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header /* ... styles */>
            <div /* ... styles */>
                <div className="flex items-center gap-3">
                    <Code className="h-7 w-7 text-accent" /* ... styles */ />
                    <h1 className="text-xl font-bold text-white tracking-widest">
                        OLLAMA_CODE_REVIEWER
                    </h1>
                </div>
            </div>
        </header>
    );
};
