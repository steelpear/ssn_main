import { 
  MailruShareButton,
  OKShareButton,
  TelegramShareButton,
  VKShareButton,
  MailruIcon,
  OKIcon,
  TelegramIcon,
  VKIcon
} from 'react-share'

export const Share = () => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const title = typeof document !== 'undefined' ? document.title : 'Ознакомьтесь с этим интересным контентом!'
  const size = 28

  return (
    <div className='grid gap-1 mr-2'>
      <MailruShareButton url={shareUrl} title={title}>
        <MailruIcon round size={size} />
      </MailruShareButton>
      <OKShareButton url={shareUrl} title={title}>
        <OKIcon round size={size} />
      </OKShareButton>
      <VKShareButton url={shareUrl} title={title}>
        <VKIcon round size={size} />
      </VKShareButton>
      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon round size={size} />
      </TelegramShareButton>
    </div>
  )
}
