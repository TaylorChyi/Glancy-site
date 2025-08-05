import React from 'react'
import apple from '../../../assets/apple.svg'
import glancyWebDark from '../../../assets/glancy-web-dark.svg'
import glancyWebLight from '../../../assets/glancy-web-light.svg'
import sendButtonDark from '../../../assets/send-button-dark.svg'
import sendButtonLight from '../../../assets/send-button-light.svg'
import defaultUserAvatarDark from '../../../assets/default-user-avatar-dark.svg'
import defaultUserAvatarLight from '../../../assets/default-user-avatar-light.svg'
import google from '../../../assets/google.svg'
import user from '../../../assets/user.svg'
import email from '../../../assets/email.svg'
import phone from '../../../assets/phone.svg'
import voiceButtonDark from '../../../assets/voice-button-dark.svg'
import voiceButtonLight from '../../../assets/voice-button-light.svg'
import glancyDark from '../../../assets/glancy-dark.svg'
import glancyLight from '../../../assets/glancy-light.svg'
import proTagDark from '../../../assets/pro-tag-dark.svg'
import proTagLight from '../../../assets/pro-tag-light.svg'
import wechat from '../../../assets/wechat.svg'
import cake from '../../../assets/cake.svg'
import link from '../../../assets/link.svg'
import flag from '../../../assets/flag.svg'
import ellipsisVertical from '../../../assets/ellipsis-vertical.svg'
import shieldCheck from '../../../assets/shield-check.svg'
import adjustmentsHorizontal from '../../../assets/adjustments-horizontal.svg'
import cog6Tooth from '../../../assets/cog-6-tooth.svg'
import commandLine from '../../../assets/command-line.svg'
import questionMarkCircle from '../../../assets/question-mark-circle.svg'
import arrowRightOnRectangle from '../../../assets/arrow-right-on-rectangle.svg'
import trash from '../../../assets/trash.svg'
import starSolid from '../../../assets/star-solid.svg'
import starOutline from '../../../assets/star-outline.svg'
import target from '../../../assets/target.svg'

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
