import { Toast } from 'react-hot-toast';
interface Props {
   t: Toast;
   loading: boolean;
   progress: number;
   handelCancel: () => void;
}
export const ToastUploadFile = ({ t }: Props) => {
   return <div className=""></div>;
};
