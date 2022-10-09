import folder from '@/assets/Folder.png';
import image from '@/assets/image.svg';
import mp3 from '@/assets/mp3.svg';
import video from '@/assets/mp4.svg';
import other from '@/assets/other.svg';
import pdf from '@/assets/pdf.svg';
import txt from '@/assets/txt.svg';
import word from '@/assets/word.svg';
import sheet from '@/assets/xlsx.svg';
import zip from '@/assets/zip.svg';
import { TFile } from '@/types';
interface Props {
   type: TFile;
   size?: number;
}

export const TypeFile = ({ type, size = 24 }: Props) => {
   const style: React.CSSProperties = {
      width: size,
      height: size,
   };
   switch (type) {
      case 'folder':
         return <img src={folder} alt="folder" style={style} />;
      case 'pdf':
         return <img src={pdf} alt="pdf" style={style} />;
      case 'doc':
         return <img src={word} alt="doc" style={style} />;
      case 'audio':
         return <img src={mp3} alt="audio" style={style} />;
      case 'image':
         return <img src={image} alt="image" style={style} />;
      case 'sheet':
         return <img src={sheet} alt="sheet" style={style} />;
      case 'video':
         return <img src={video} alt="video" style={style} />;
      case 'zip':
         return <img src={zip} alt="zip" style={style} />;
      case 'txt':
         return <img src={txt} alt="txt" style={style} />;
      default:
         return <img src={other} alt="other" style={style} />;
   }
};
