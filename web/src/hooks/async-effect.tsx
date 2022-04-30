import { useEffect } from "react";

export function useEffectAsync(fn: () => Promise<void | (() => void)>, deps: any[]) {
    useEffect(() => {
        fn()
    }, deps);
}
