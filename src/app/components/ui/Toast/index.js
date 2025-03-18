import { Typography } from '@/components/ui';
import useScreenSize from '@/hooks/useScreenSize';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
  const { isMobile } = useScreenSize();

  const showToast = useCallback(
    ({ type, title, message }) => {
      let icon;
      let toastClass;

      switch (type) {
        case 'success':
          title = message || 'Gửi thành công';
          toastClass = 'bg-white text-[#757575]';
          break;
        case 'error':
          title = message || 'Thất bại';
          toastClass = 'bg-white border border-red-500 text-red-500';
          break;
        case 'warn':
          title = message || 'Cảnh báo';
          toastClass = 'bg-amber-100 text-amber-800';
          break;
        default:
          icon = null;
          toastClass = '';
      }

      toast(
        <div className='flex items-center'>
          {icon && <div className='mr-3'>{icon}</div>}
          <Typography className='break-words font-Inter font-medium'>{title}</Typography>
        </div>,
        {
          className: cn(
            'flex items-center font-Inter shadow-lg max-w-[500px] md:max-w-none',
            toastClass
          ),
          type,
          autoClose: 3000,
          position: isMobile ? 'bottom-center' : 'top-right',
          style: {
            borderRadius: '12px',
            marginLeft: isMobile ? '15px' : '',
            marginRight: isMobile ? '15px' : '',
            marginTop: '0px',
            marginBottom: isMobile ? '15px' : '',
            padding: '16px',
          },
        }
      );
    },
    [isMobile]
  );

  return showToast;
};

export default useToast;
