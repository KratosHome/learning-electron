import {useEffect, useState} from "react";


export const useMount = (opened: boolean, animationTime: number) => {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        if (opened && !mounted) {
            setMounted(true)
        } else if (!opened && mounted) {
            setTimeout(() => {
                setMounted(false)
            }, animationTime)
        }
    }, [opened]);

    return {
        mounted
    }
}
