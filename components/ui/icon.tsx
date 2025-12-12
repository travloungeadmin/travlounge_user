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

import ArrowDown from '@/assets/svgs/icons/arrow-down.svg';
import BathTowel from '@/assets/svgs/icons/bath_towel.svg';
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
import Fillomart from '@/assets/svgs/icons/fillomart.svg';
import TravloungeIcon from '@/assets/svgs/icons/icon.svg';
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
import CafeMap from '@/assets/svgs/map/cafe.svg';
import CarWashMap from '@/assets/svgs/map/car-wash.svg';
import FillomartMap from '@/assets/svgs/map/fillomart.svg';
import MechanicMap from '@/assets/svgs/map/mechanic.svg';
import PetrolPumpMap from '@/assets/svgs/map/petrol-pumb.svg';
import ResortMap from '@/assets/svgs/map/resort.svg';
import RestaurantMap from '@/assets/svgs/map/restorent.svg';
import SleepingPodMap from '@/assets/svgs/map/sleeping-pod.svg';
import TolooMap from '@/assets/svgs/map/toloo.svg';
const icons = {
  SendIcon,
  SellCar,
  Support,
  EditProfile,
  RoundPlus,
  RoundMinus,
  Delete,
  LocationPermission,
  DurationIcon,
  SleepingPodMap,
  Clock,
  CafeMap,
  Check,
  Bookings,
  PartnerIcon,
  RestaurantMap,
  ArrowDown,
  PodTypeIcon,
  DoublePod,
  PetrolPumpMap,
  SinglePod,
  CarWashMap,
  Search,
  FillomartMap,
  Calendar,
  ResortMap,
  BathTowel,
  MechanicMap,
  TolooMap,
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
