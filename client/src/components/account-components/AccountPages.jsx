import React from 'react'
import { useTranslation } from 'react-i18next';
import { CiCircleInfo, CiCircleRemove, CiClock2, CiMoneyCheck1, CiViewList, CiSettings } from 'react-icons/ci';
import { GoShieldLock } from 'react-icons/go';
import { TfiStatsUp } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
  
const AccountPages = () => {
    const { t } = useTranslation();

    const accountSettings = [
        {
          links: [
            {
              name: t('ACCOUNT.Pages.personalInfo.title'),
              icon: CiCircleInfo,
              to: '/account/personal-information',
              description: t('ACCOUNT.Pages.personalInfo.description')
            },
            {
              name: t('ACCOUNT.Pages.security.title'),
              icon: GoShieldLock,
              to: '/account/security',
              description: t('ACCOUNT.Pages.security.description')
            },
            {
              name: t('ACCOUNT.Pages.payment.title'),
              icon: CiMoneyCheck1,
              to: '/account/payments-payouts',
              description: t('ACCOUNT.Pages.payment.description')
            },
            {
              name: t('ACCOUNT.Pages.stats.title'),
              icon: TfiStatsUp,
              to: '/account/account-statistics',
              description: t('ACCOUNT.Pages.stats.description')
            },
            {
              name: t('ACCOUNT.Pages.deactivate.title'),
              icon: CiCircleRemove,
              to: '/account/account-deactivation',
              description: t('ACCOUNT.Pages.deactivate.description')
            },
            {
              name: t('ACCOUNT.Pages.settings.title'),
              icon: CiSettings,
              to: '/account/settings',
              description: t('ACCOUNT.Pages.settings.description')
            },
          ],
        },
      ];
  return (
    <div className="max-w-6xl w-full mt-[3rem] px-4">
        {accountSettings.map((menu, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" key={index}>
                {menu.links.map((link, linkIndex) => (
                    <Link
                        to={link.name === 'Profile' ? `/dashboard/${userInfo._id}` : link.to}
                        key={linkIndex}
                        className="flex flex-col dark:bg-gray-800 mt-1 lg:mt-2 rounded-md text-n-8 dark:text-n-1 shadow-lg p-6 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-transparent dark:border-gray-700"
                        aria-label={link.name}
                    >
                        {link.icon && React.createElement(link.icon, { size: 30, className:"text-n-8 dark:text-n-1" })}
                        <span className="text-md font-bold mt-4 mb-2">{link.name}</span>
                        <p className="text-xs text-gray-400">{link.description}</p>
                    </Link>
                ))}
            </div>
        ))}
    </div>
  )
}

export default AccountPages