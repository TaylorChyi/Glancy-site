import React from 'react'

// Logos
import apple from '@/assets/logos/apple.svg'
import google from '@/assets/logos/google.svg'
import wechat from '@/assets/logos/wechat.svg'

// Brand assets
import glancyWebDark from '@/assets/brand/glancy-web-dark.svg'
import glancyWebLight from '@/assets/brand/glancy-web-light.svg'
import glancyDark from '@/assets/brand/glancy-dark.svg'
import glancyLight from '@/assets/brand/glancy-light.svg'
import proTagDark from '@/assets/brand/pro-tag-dark.svg'
import proTagLight from '@/assets/brand/pro-tag-light.svg'

// Buttons
import sendButtonDark from '@/assets/buttons/send-button-dark.svg'
import sendButtonLight from '@/assets/buttons/send-button-light.svg'
import voiceButtonDark from '@/assets/buttons/voice-button-dark.svg'
import voiceButtonLight from '@/assets/buttons/voice-button-light.svg'

// Avatars
import defaultUserAvatarDark from '@/assets/avatars/default-user-avatar-dark.svg'
import defaultUserAvatarLight from '@/assets/avatars/default-user-avatar-light.svg'

// Icons
import adjustmentsHorizontal from '@/assets/icons/adjustments-horizontal.svg'
import arrowRightOnRectangle from '@/assets/icons/arrow-right-on-rectangle.svg'
import cake from '@/assets/icons/cake.svg'
import cog6Tooth from '@/assets/icons/cog-6-tooth.svg'
import commandLine from '@/assets/icons/command-line.svg'
import ellipsisVertical from '@/assets/icons/ellipsis-vertical.svg'
import email from '@/assets/icons/email.svg'
import flag from '@/assets/icons/flag.svg'
import link from '@/assets/icons/link.svg'
import phone from '@/assets/icons/phone.svg'
import questionMarkCircle from '@/assets/icons/question-mark-circle.svg'
import shieldCheck from '@/assets/icons/shield-check.svg'
import starOutline from '@/assets/icons/star-outline.svg'
import starSolid from '@/assets/icons/star-solid.svg'
import target from '@/assets/icons/target.svg'
import trash from '@/assets/icons/trash.svg'
import user from '@/assets/icons/user.svg'

function createIcon(src, alt) {
  return function Icon(props) {
    return <img src={src} alt={alt} {...props} />
  }
}

export const AppleIcon = createIcon(apple, 'apple')
export const GlancyWebDarkIcon = createIcon(glancyWebDark, 'glancy-web-dark')
export const GlancyWebLightIcon = createIcon(glancyWebLight, 'glancy-web-light')
export const SendButtonDarkIcon = createIcon(sendButtonDark, 'send-button-dark')
export const SendButtonLightIcon = createIcon(sendButtonLight, 'send-button-light')
export const DefaultUserAvatarDarkIcon = createIcon(defaultUserAvatarDark, 'default-user-avatar-dark')
export const DefaultUserAvatarLightIcon = createIcon(defaultUserAvatarLight, 'default-user-avatar-light')
export const GoogleIcon = createIcon(google, 'google')
export const UserIcon = createIcon(user, 'user')
export const EmailIcon = createIcon(email, 'email')
export const PhoneIcon = createIcon(phone, 'phone')
export const VoiceButtonDarkIcon = createIcon(voiceButtonDark, 'voice-button-dark')
export const VoiceButtonLightIcon = createIcon(voiceButtonLight, 'voice-button-light')
export const GlancyDarkIcon = createIcon(glancyDark, 'glancy-dark')
export const GlancyLightIcon = createIcon(glancyLight, 'glancy-light')
export const ProTagDarkIcon = createIcon(proTagDark, 'pro-tag-dark')
export const ProTagLightIcon = createIcon(proTagLight, 'pro-tag-light')
export const WechatIcon = createIcon(wechat, 'wechat')
export const CakeIcon = createIcon(cake, 'cake')
export const LinkIcon = createIcon(link, 'link')
export const FlagIcon = createIcon(flag, 'flag')
export const EllipsisVerticalIcon = createIcon(ellipsisVertical, 'ellipsis-vertical')
export const ShieldCheckIcon = createIcon(shieldCheck, 'shield-check')
export const AdjustmentsHorizontalIcon = createIcon(adjustmentsHorizontal, 'adjustments-horizontal')
export const Cog6ToothIcon = createIcon(cog6Tooth, 'cog-6-tooth')
export const CommandLineIcon = createIcon(commandLine, 'command-line')
export const QuestionMarkCircleIcon = createIcon(questionMarkCircle, 'question-mark-circle')
export const ArrowRightOnRectangleIcon = createIcon(arrowRightOnRectangle, 'arrow-right-on-rectangle')
export const TrashIcon = createIcon(trash, 'trash')
export const StarSolidIcon = createIcon(starSolid, 'star-solid')
export const StarIcon = createIcon(starOutline, 'star-outline')
export const TargetIcon = createIcon(target, 'target')

export default {
  AppleIcon,
  GlancyWebDarkIcon,
  GlancyWebLightIcon,
  SendButtonDarkIcon,
  SendButtonLightIcon,
  DefaultUserAvatarDarkIcon,
  DefaultUserAvatarLightIcon,
  GoogleIcon,
  UserIcon,
  EmailIcon,
  PhoneIcon,
  VoiceButtonDarkIcon,
  VoiceButtonLightIcon,
  GlancyDarkIcon,
  GlancyLightIcon,
  ProTagDarkIcon,
  ProTagLightIcon,
  WechatIcon,
  CakeIcon,
  LinkIcon,
  FlagIcon,
  EllipsisVerticalIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  StarSolidIcon,
  StarIcon,
  TargetIcon
}
