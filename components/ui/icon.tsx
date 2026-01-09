import ArrowRight from '@/assets/svgs/icons/arrow-right.svg';
import Bookings from '@/assets/svgs/icons/bookings.svg';
import Cafe from '@/assets/svgs/icons/cafe.svg';
import Discount from '@/assets/svgs/icons/discount.svg';
import MapPin from '@/assets/svgs/icons/map-pin.svg';
import Notification from '@/assets/svgs/icons/notification.svg';
import PartnerIcon from '@/assets/svgs/icons/partner-icon.svg';
import Pin from '@/assets/svgs/icons/pin.svg';
import Restaurant from '@/assets/svgs/icons/restaurant.svg';
import Settings from '@/assets/svgs/icons/settings.svg';
import SleepingPod from '@/assets/svgs/icons/sleeping-pod.svg';
import Toloo from '@/assets/svgs/icons/toloo.svg';
import User from '@/assets/svgs/icons/user.svg';
import { View } from 'react-native';

import ArrowDown from '@/assets/svgs/icons/arrow-down.svg';
import Buffet from '@/assets/svgs/icons/buffet.svg';
import Calendar from '@/assets/svgs/icons/calendar.svg';
import CarWash from '@/assets/svgs/icons/car-wash.svg';
import Car from '@/assets/svgs/icons/car.svg';
import Check from '@/assets/svgs/icons/check.svg';
import Clock from '@/assets/svgs/icons/clock.svg';
import Crown from '@/assets/svgs/icons/crown.svg';
import DeleteProfile from '@/assets/svgs/icons/delete-profile.svg';
import Delete from '@/assets/svgs/icons/delete.svg';
import DentalKit from '@/assets/svgs/icons/dental_kit.svg';
import DoublePod from '@/assets/svgs/icons/double-pod.svg';
import DurationIcon from '@/assets/svgs/icons/duration-icon.svg';
import EditProfile from '@/assets/svgs/icons/edit-profile.svg';
import EliteCardIcon from '@/assets/svgs/icons/elite-card/elite-card-icon.svg';
import Empty from '@/assets/svgs/icons/empty.svg';
import Error from '@/assets/svgs/icons/error.svg';
import Fillomart from '@/assets/svgs/icons/fillomart.svg';
import TravloungeIcon from '@/assets/svgs/icons/icon.svg';
import Insurance from '@/assets/svgs/icons/insurance.svg';
import LocationPermission from '@/assets/svgs/icons/location_permission.svg';
import Logout from '@/assets/svgs/icons/logout.svg';
import Mechanic from '@/assets/svgs/icons/mechanic.svg';
import Menu from '@/assets/svgs/icons/menu.svg';
import MinaralWater from '@/assets/svgs/icons/minaral_water.svg';
import PetrolPump from '@/assets/svgs/icons/petrol-pump.svg';
import PodTypeIcon from '@/assets/svgs/icons/pod-type-icon.svg';
import Resort from '@/assets/svgs/icons/resort.svg';
import RoundMinus from '@/assets/svgs/icons/round-minus.svg';
import RoundPlus from '@/assets/svgs/icons/round-plus.svg';
import Search from '@/assets/svgs/icons/search.svg';
import SellCar from '@/assets/svgs/icons/sell-car.svg';
import SendIcon from '@/assets/svgs/icons/send-icon.svg';
import Send from '@/assets/svgs/icons/send.svg';
import ShowerKit from '@/assets/svgs/icons/shower_kit.svg';
import SinglePod from '@/assets/svgs/icons/single-pod.svg';
import Star from '@/assets/svgs/icons/star.svg';
import Stars from '@/assets/svgs/icons/stars.svg';
import Support from '@/assets/svgs/icons/support.svg';
import Surprice from '@/assets/svgs/icons/surprice.svg';
import { moderateScale } from '@/lib/responsive-dimensions';

const icons = {
  Insurance,
  SendIcon,
  SellCar,
  Empty,
  Error,
  Support,
  EditProfile,
  RoundPlus,
  RoundMinus,
  Delete,
  LocationPermission,
  DurationIcon,
  Clock,
  Check,
  Bookings,
  PartnerIcon,
  ArrowDown,
  PodTypeIcon,
  DoublePod,
  SinglePod,
  Search,
  Calendar,
  Stars,
  Send,
  Car,
  Menu,
  Pin,
  User,
  MapPin,
  Settings,
  Discount,
  Notification,
  ArrowRight,
  Toloo,
  Buffet,
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
  DentalKit,
  MinaralWater,
  ShowerKit,
  DeleteProfile,
  Logout,
  EliteCardIcon,
};

export type IconName = keyof typeof icons;

interface PropsType {
  name: IconName;
  size?: number;
  stroke?: string;
  fill?: string;
}

const Icon = (props: PropsType): React.JSX.Element => {
  const { stroke, name, size, fill } = props;

  const IconName = icons[name];
  console.log('Icon render:', { name, found: !!IconName });
  if (!IconName) return <View />;

  return (
    <IconName
      fill={fill ?? 'none'}
      height={size ?? moderateScale(24)}
      stroke={stroke ?? 'none'}
      width={size ?? moderateScale(24)}
    />
  );
};

export default Icon;
