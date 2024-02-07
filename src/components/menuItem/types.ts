import { SvgIconComponent } from '@mui/icons-material';

export type Props = {
    text: string;
    Icon: SvgIconComponent;
    url: string;
    color?: string;
    func?: () => void;
    align?: "justify-start" | "justify-end" | "justify-center" | "justify-between" | "justify-around" | "justify-evenly";
    fontSize?: "small" | "medium" | "large";
}