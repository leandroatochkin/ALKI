import HouseIcon from '@mui/icons-material/House';
import StoreIcon from '@mui/icons-material/Store';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessIcon from '@mui/icons-material/Business';
import FactoryIcon from '@mui/icons-material/Factory';
import ForestIcon from '@mui/icons-material/Forest';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const PropertyIconMapper = (propertyType: number) => {
    switch (propertyType) {
        case 0:
            return HouseIcon; //house
        case 1:
            return LocationCityIcon; //apartment
        case 2:
            return StoreIcon; //store/commercial
        case 3:
            return ForestIcon; //land
        case 4:
            return BusinessIcon; //office
        case 5:
            return FactoryIcon; //industrial
        case 6:
            return QuestionMarkIcon; //other
            
    }
}