import React, {ReactNode, useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import './ReactModal.scss';
import {CSSTransition} from 'react-transition-group';
import {useMount} from '../../hooks/useMount';

const modalRootElement: HTMLElement | null = document.querySelector('#modal');


export interface SelectedModalType {
    isModalOpen: boolean;
    onClose: () => void;
    modalPosition?: string;
    topCoords?: number;
    onBlur?: boolean;
    animationTime: number;
    leftCoords?: number
    children: ReactNode;
    nodeRef: any
}


export const ReactModal: React.FC<SelectedModalType> = ({
                                                            children,
                                                            isModalOpen,
                                                            onClose,
                                                            modalPosition,
                                                            topCoords,
                                                            onBlur,
                                                            animationTime,
                                                            nodeRef,
                                                            leftCoords
                                                        }) => {

    const {mounted} = useMount(isModalOpen, animationTime)


    const element = useMemo<HTMLDivElement>(
        () => document.createElement('div'),
        [],
    );


    useEffect(() => {
        if (mounted) {
            modalRootElement?.appendChild(element);

            return () => {
                modalRootElement?.removeChild(element);
            };
        }
    });
    if (mounted) {
        return createPortal(
            <div className={onBlur ? 'onBlur' : ''}>
                <div className='modal' onClick={onClose}>
                    <div
                        className={`modal__content ${modalPosition}`}
                        style={{
                            top: `${topCoords}px`,
                            left: `${leftCoords}px`
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CSSTransition
                            nodeRef={nodeRef}
                            in={isModalOpen}
                            classNames="alert"
                            timeout={animationTime}
                            mountOnEnter
                            unmountOnExit
                        >
                            {children}
                        </CSSTransition>
                    </div>
                </div>
            </div>,
            element,
        );
    }

    return null;
};
