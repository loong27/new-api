import React from 'react';
import { Button, Popover } from '@douyinfe/semi-ui';
import { Gift, Copy } from 'lucide-react';
import { copy, showSuccess } from '../../../helpers/utils';
import { useTranslation } from 'react-i18next';

const btnClass =
  '!p-1.5 !text-current focus:!bg-semi-color-fill-1 dark:focus:!bg-gray-700 !rounded-full !bg-semi-color-fill-0 dark:!bg-semi-color-fill-1 hover:!bg-semi-color-fill-1 dark:hover:!bg-semi-color-fill-2';

/** 福利群二维码按钮 — 仅在后台配置了二维码 URL 时显示 */
const QRCodeButton = ({ qrcodeUrl, isMobile, t }) => {
  if (!qrcodeUrl) return null;

  const popoverContent = (
    <div style={{ padding: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 6, fontWeight: 600 }}>
        {t('福利群')}
      </div>
      <img
        src={qrcodeUrl}
        alt={t('福利群')}
        style={{ maxWidth: 240, borderRadius: 8, display: 'block' }}
      />
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      trigger={isMobile ? 'click' : 'hover'}
      position='bottom'
    >
      <Button
        icon={<Gift size={18} />}
        aria-label={t('福利群')}
        theme='borderless'
        type='tertiary'
        className={btnClass}
      />
    </Popover>
  );
};

/** 复制本站ID按钮 — 点击直接复制并提示成功 */
const CopyIdButton = ({ userState, t }) => {
  const hostname = window.location.hostname;
  const userId = userState?.user?.id || '';
  const siteIdText = t('来自站点：{{hostname}}，我的id是:{{userId}}', {
    hostname,
    userId,
  });

  const handleCopy = async () => {
    await copy(siteIdText);
    showSuccess(t('复制成功'));
  };

  return (
    <Button
      icon={<Copy size={18} />}
      aria-label={t('复制本站ID')}
      theme='borderless'
      type='tertiary'
      className={btnClass}
      onClick={handleCopy}
    />
  );
};

/** 包含福利群 + 复制ID 两个独立按钮 */
const WelfareButtons = ({ userState, statusState, isMobile }) => {
  const { t } = useTranslation();

  const qrcodeUrl = statusState?.status?.welfare_group_qrcode || '';

  return (
    <>
      <QRCodeButton qrcodeUrl={qrcodeUrl} isMobile={isMobile} t={t} />
      <CopyIdButton userState={userState} t={t} />
    </>
  );
};

export default WelfareButtons;
