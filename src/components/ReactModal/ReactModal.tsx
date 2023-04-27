import {ReactNode} from "react";
import {useMount} from "../../hooks/useMount";
import {Layout} from "./Leuout";
import Portal from "./Portal";

interface SimpleAnimatedModalProps {
    opened: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ReactModal: React.FC<SimpleAnimatedModalProps> = ({opened, onClose, children}) => {
    const {mounted} = useMount(opened, 300);

    if (!mounted) {
        return null;
    }

    return (
        <Portal>
            <Layout onClose={onClose} opened={opened}>
                {children}
            </Layout>
        </Portal>
    );
};
