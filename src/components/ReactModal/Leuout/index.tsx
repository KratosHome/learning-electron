import {ReactNode, useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";

import styles from "./styles.module.css";
import animationStyles from "./animation.module.css";

const overlayAnimation = {
    enter: animationStyles.overlayEnter,
    enterActive: animationStyles.overlayEnterActive,
    exit: animationStyles.overlayExit,
    exitActive: animationStyles.overlayExitActive,
};

const contentAnimation = {
    enter: animationStyles.contentEnter,
    enterActive: animationStyles.contentEnterActive,
    exit: animationStyles.contentExit,
    exitActive: animationStyles.contentExitActive,
};

interface LayoutProps {
    onClose: () => void;
    children: ReactNode;
    opened: boolean;
}

export const Layout: React.FC<LayoutProps> = ({onClose, children, opened}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [animationIn, setAnimationIn] = useState(false);

    useEffect(() => {
        setAnimationIn(opened);
    }, [opened]);

    return (
        <div className={styles.container}>
            <CSSTransition
                in={animationIn}
                nodeRef={overlayRef}
                timeout={300}
                mountOnEnter
                unmountOnExit
                classNames={overlayAnimation}
            >
                <div ref={overlayRef} className={styles.overlay} onClick={onClose}/>
            </CSSTransition>
            <CSSTransition
                in={animationIn}
                nodeRef={contentRef}
                timeout={300}
                mountOnEnter
                unmountOnExit
                classNames={contentAnimation}
            >
                <div ref={contentRef} className={styles.content}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};
