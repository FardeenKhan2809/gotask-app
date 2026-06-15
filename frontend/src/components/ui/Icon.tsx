import React from 'react';
import * as Fi from 'react-icons/fi';

type IconName =
    | 'zap'
    | 'building-2'
    | 'chevrons-up-down'
    | 'layout-dashboard'
    | 'check-square'
    | 'timer'
    | 'calendar'
    | 'bar-chart-2'
    | 'users'
    | 'folder'
    | 'bell'
    | 'settings'
    | 'log-out'
    | 'search'
    | 'plus'
    | 'clock'
    | 'trending-up'
    | 'square'
    | 'save'
    | 'arrow-right'
    | 'sliders-horizontal'
    | 'arrow-up-down'
    | 'layout-grid'
    | 'list'
    | 'more-horizontal'
    | 'message-square'
    | 'paperclip'
    | 'play'
    | 'pause'
    | 'minus'
    | 'arrow-up'
    | 'arrow-down'
    | 'check-circle-2'
    | 'play-circle'
    | 'message-circle'
    | 'plus-circle'
    | 'file-text';

const iconMap: Record<IconName, React.ElementType> = {
    zap: Fi.FiZap,
    'building-2': Fi.FiHome,
    'chevrons-up-down': Fi.FiChevronsUpDown,
    'layout-dashboard': Fi.FiGrid,
    'check-square': Fi.FiCheckSquare,
    timer: Fi.FiClock,
    calendar: Fi.FiCalendar,
    'bar-chart-2': Fi.FiBarChart2,
    users: Fi.FiUsers,
    folder: Fi.FiFolder,
    bell: Fi.FiBell,
    settings: Fi.FiSettings,
    'log-out': Fi.FiLogOut,
    search: Fi.FiSearch,
    plus: Fi.FiPlus,
    clock: Fi.FiClock,
    'trending-up': Fi.FiTrendingUp,
    square: Fi.FiSquare,
    save: Fi.FiSave,
    'arrow-right': Fi.FiArrowRight,
    'sliders-horizontal': Fi.FiSliders,
    'arrow-up-down': Fi.FiArrowUpDown,
    'layout-grid': Fi.FiGrid,
    list: Fi.FiList,
    'more-horizontal': Fi.FiMoreHorizontal,
    'message-square': Fi.FiMessageSquare,
    paperclip: Fi.FiPaperclip,
    play: Fi.FiPlay,
    pause: Fi.FiPause,
    minus: Fi.FiMinus,
    'arrow-up': Fi.FiArrowUp,
    'arrow-down': Fi.FiArrowDown,
    'check-circle-2': Fi.FiCheckCircle,
    'play-circle': Fi.FiPlayCircle,
    'message-circle': Fi.FiMessageCircle,
    'plus-circle': Fi.FiPlusCircle,
    'file-text': Fi.FiFileText,
};

interface IconProps {
    name: IconName;
    size?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 16, className = '' }) => {
    const Comp = iconMap[name];
    if (!Comp) return null;
    return <Comp size={size} className={`text-current ${className}`} />;
};

export default Icon;