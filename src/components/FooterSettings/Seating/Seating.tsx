import React, {useRef, useState} from 'react';
import {ReactModal} from '../../ReactModal';
import "./seating.scss"

const Seating = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const nodeRef = useRef(null);


    const clickSelects = (e: React.MouseEvent<HTMLButtonElement>) => {
        setVisible(!visible)
    }

    return (
        <>
            <button className="container_seating" onClick={clickSelects}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt"
                     viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000"
                       stroke="none">
                        <path
                            d="M2281 5104 c-80 -21 -149 -62 -212 -124 -95 -93 -139 -206 -139 -350 l0 -87 -87 -33 c-49 -18 -121 -48 -162 -67 l-75 -34 -55 55 c-140 136 -305 185 -476 141 -102 -27 -160 -69 -326 -234 -165 -166 -207 -224 -234 -326 -44 -171 5 -336 141 -475 l54 -56 -44 -99 c-24 -55 -54 -128 -66 -162 l-23 -63 -87 0 c-144 0 -256 -44 -351 -139 -116 -117 -139 -197 -139 -491 0 -295 22 -371 140 -491 93 -95 206 -139 350 -139 l87 0 33 -87 c18 -49 48 -121 67 -162 l34 -75 -55 -55 c-30 -31 -68 -78 -85 -106 -90 -144 -94 -334 -9 -484 42 -75 324 -357 399 -399 142 -80 319 -82 463 -4 28 15 80 55 117 89 l66 63 99 -43 c55 -24 127 -54 162 -67 l62 -22 0 -87 c0 -145 44 -258 139 -351 120 -118 196 -140 491 -140 294 0 374 23 491 139 95 95 139 207 139 352 l0 87 63 22 c34 13 106 43 161 67 l99 43 66 -63 c37 -34 89 -74 117 -89 141 -76 316 -76 458 0 67 36 360 328 403 402 81 139 83 319 5 464 -15 28 -55 80 -89 117 l-63 66 43 99 c24 55 54 127 67 162 l22 62 87 0 c148 0 256 43 351 139 118 120 140 196 140 491 0 295 -22 371 -140 491 -95 96 -203 139 -351 139 l-87 0 -22 63 c-13 34 -43 106 -67 161 l-43 99 63 66 c34 37 74 89 89 117 78 144 76 321 -4 463 -42 74 -334 366 -404 403 -150 81 -338 76 -479 -13 -27 -17 -75 -55 -106 -85 l-55 -55 -75 34 c-41 19 -113 49 -161 67 l-88 33 0 87 c0 144 -44 256 -139 351 -63 63 -131 101 -218 124 -79 21 -474 20 -552 -1z m516 -305 c29 -14 52 -35 68 -63 23 -40 25 -52 25 -184 0 -158 12 -209 59 -240 14 -10 85 -37 156 -61 72 -23 193 -74 270 -112 77 -38 150 -69 163 -69 48 0 99 34 196 130 104 102 133 120 191 120 60 0 88 -19 229 -158 141 -140 166 -175 166 -236 0 -59 -18 -88 -120 -192 -97 -98 -130 -148 -130 -197 0 -13 31 -87 70 -164 38 -78 88 -199 111 -269 24 -71 51 -141 61 -155 31 -47 82 -59 240 -59 132 0 144 -2 184 -25 75 -44 84 -78 84 -305 0 -227 -9 -261 -84 -305 -40 -23 -52 -25 -184 -25 -158 0 -209 -12 -240 -59 -10 -14 -37 -84 -61 -155 -23 -70 -73 -191 -111 -269 -39 -77 -70 -151 -70 -164 0 -49 33 -99 130 -197 102 -104 120 -133 120 -191 0 -60 -19 -87 -157 -227 -142 -143 -177 -168 -236 -168 -60 0 -88 18 -193 120 -98 97 -148 130 -198 130 -13 0 -87 -31 -163 -69 -76 -38 -196 -89 -268 -112 -71 -24 -142 -51 -156 -61 -47 -31 -59 -82 -59 -240 0 -132 -2 -144 -25 -184 -44 -75 -78 -84 -305 -84 -227 0 -261 9 -305 84 -23 40 -25 52 -25 184 0 158 -12 209 -59 240 -14 10 -84 38 -156 61 -71 24 -193 74 -269 112 -77 38 -150 69 -163 69 -49 0 -99 -33 -197 -130 -104 -102 -133 -120 -192 -120 -61 0 -96 25 -236 166 -139 141 -158 169 -158 229 0 58 18 87 120 191 97 98 130 148 130 197 0 13 -31 87 -70 164 -38 78 -88 199 -111 269 -24 71 -51 141 -61 155 -31 47 -82 59 -240 59 -132 0 -144 2 -184 25 -75 44 -84 78 -84 305 0 227 9 261 84 305 40 23 52 25 184 25 158 0 209 12 240 59 10 14 38 85 61 156 23 72 74 193 112 269 38 77 69 150 69 163 0 49 -33 99 -130 197 -102 104 -120 133 -120 192 0 61 25 96 166 236 141 139 169 158 229 158 58 0 87 -18 191 -120 98 -97 148 -130 197 -130 13 0 87 31 164 70 78 38 199 88 269 111 71 24 141 51 155 61 47 31 59 82 59 240 0 132 2 144 25 183 16 28 39 50 67 64 39 19 60 21 237 21 177 0 199 -2 238 -21z"/>
                        <path
                            d="M2335 3650 c-416 -90 -742 -398 -853 -808 -24 -88 -26 -114 -26 -282 0 -168 2 -194 26 -282 105 -387 409 -691 796 -796 88 -24 114 -26 282 -26 168 0 194 2 282 26 387 105 691 409 796 796 24 88 26 114 26 282 0 168 -2 194 -26 282 -105 387 -411 694 -793 794 -139 37 -376 43 -510 14z m412 -300 c370 -89 623 -409 623 -790 0 -454 -356 -810 -810 -810 -224 0 -415 79 -574 236 -271 269 -316 698 -106 1017 115 176 304 308 504 352 95 20 266 18 363 -5z"/>
                    </g>
                </svg>
            </button>
            <ReactModal
                isModalOpen={visible}
                animationTime={200}
                onClose={() => setVisible(!visible)}
                nodeRef={nodeRef}
                modalPosition={'center-modal-position'}
            >
                <div
                    ref={nodeRef}
                    className="container_modal_setting"
                >
                    11111111 fdsvd
                </div>
            </ReactModal>
        </>
    );
};

export default Seating;


/*
    const [visible, setVisible] = useState<boolean>(false)
    const [topCoords, setTopCoords] = useState<any>(0);
    const [leftCoords, setLeftCoords] = useState<number>(0);
    const nodeRef = useRef(null);


    const clickSelects = (e: React.MouseEvent<HTMLButtonElement>) => {
        let rect = (e.target as Element).getBoundingClientRect();
        setTopCoords(rect.top + 21);
        setLeftCoords(rect.left);
        setVisible(!visible)
    }



            <ReactModal
                isModalOpen={visible}
                animationTime={200}
                onClose={() => setVisible(!visible)}
                topCoords={topCoords}
                leftCoords={leftCoords}
                nodeRef={nodeRef}
            >
                <div
                    ref={nodeRef}
                    className="container_modal_setting"
                >
                    11111111 fdsvd
                </div>
 */
