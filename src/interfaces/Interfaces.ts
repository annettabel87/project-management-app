export interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export interface CreateBoardFormProps {
  isAuth: boolean;
  onClose: () => void;
}
