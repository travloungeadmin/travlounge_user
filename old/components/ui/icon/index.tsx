import Pin from '@/assets/svgs/icons/pin.svg';
import User from '@/assets/svgs/icons/user.svg';
import MapPin from '@/assets/svgs/icons/map-pin.svg';
import Settings from '@/assets/svgs/icons/settings.svg';
import Discount from '@/assets/svgs/icons/discount.svg';
import Notification from '@/assets/svgs/icons/notification.svg';
import ArrowRight from '@/assets/svgs/icons/arrow-right.svg';
import Toloo from '@/assets/svgs/icons/toloo.svg';
import SleepingPod from '@/assets/svgs/icons/sleeping-pod.svg';
import Cafe from '@/assets/svgs/icons/cafe.svg';
import Restaurant from '@/assets/svgs/icons/restaurant.svg';

import PetrolPump from '@/assets/svgs/icons/petrol-pump.svg';
import CarWash from '@/assets/svgs/icons/car-wash.svg';
import Fillomart from '@/assets/svgs/icons/fillomart.svg';
import Resort from '@/assets/svgs/icons/resort.svg';
import Mechanic from '@/assets/svgs/icons/mechanic.svg';
import TravloungeIcon from '@/assets/svgs/icons/icon.svg';
import Crown from '@/assets/svgs/icons/crown.svg';
import Surprice from '@/assets/svgs/icons/surprice.svg';
import Star from '@/assets/svgs/icons/star.svg';
import Menu from '@/assets/svgs/icons/menu.svg';

const icons = {
  Menu,
  Pin,
  User,
  MapPin,
  Settings,
  Discount,
  Notification,
  ArrowRight,
  Toloo,
  SleepingPod,
  Cafe,
  Restaurant,
  PetrolPump,
  CarWash,
  Fillomart,
  Resort,
  Mechanic,
  TravloungeIcon,
  Crown,
  Surprice,
  Star,
};

interface PropsType {
  name: keyof typeof icons;
  size?: number;
  stroke?: string;
  fill?: string;
}

const Icon = (props: PropsType): React.JSX.Element => {
  const { stroke, name, size, fill } = props;

  const IconName = icons[name];

  return (
    <IconName
      fill={fill ?? 'none'}
      height={size ?? 24}
      stroke={stroke ?? 'none'}
      width={size ?? 24}
    />
  );
};

export default Icon;
