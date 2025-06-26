import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

interface CustomSvgIconProps {
  color: string;
  size?: number;
  focused?: boolean;
  type: 'ice-cream-cone' | 'ice-cream-scoop' | 'ice-cream-sundae' | 'melting-ice-cream' | 'sparkly-cone';
}

export const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ 
  color, 
  size = 28, 
  focused = false,
  type 
}) => {
  const scale = focused ? 1.2 : 1;
  const iconSize = size * scale;

  const renderIcon = () => {
    switch (type) {
      case 'melting-ice-cream':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 20" fill="none">
            {/* Cone */}
            <Path
              d="M8.5 10 L12 19 L15.5 10 Z"
              fill="#D2691E"
              stroke="#8B4513"
              strokeWidth="1"
            />
            {/* Melting ice cream main scoop */}
            <Path
              d="M12 6 C15 6 17 8 17 10 C17 10.5 16.8 11 16.5 11.3 L7.5 11.3 C7.2 11 7 10.5 7 10 C7 8 9 6 12 6 Z"
              fill={color}
              stroke="#FFF"
              strokeWidth="1"
            />
            {/* Melting drips */}
            <Path
              d="M9 11 Q8.5 12 8.5 13 Q8.5 14 9.5 14 Q10.5 14 10.5 13 Q10.5 12.5 10 11.5"
              fill={color}
              opacity="0.8"
            />
            <Path
              d="M14 11 Q13.5 12.5 13.5 13.5 Q13.5 14.5 14.5 14.5 Q15.5 14.5 15.5 13.5 Q15.5 12 15 11"
              fill={color}
              opacity="0.8"
            />
            <Path
              d="M11.5 11 Q11 12.8 11 14 Q11 15 12 15 Q13 15 13 14 Q13 13 12.5 11.2"
              fill={color}
              opacity="0.7"
            />
            {/* Heat waves when focused */}
            {focused && (
              <>
                <Path
                  d="M6 5 Q7 3 8 5 Q9 7 10 5"
                  stroke="#FF6B47"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
                <Path
                  d="M14 5 Q15 3 16 5 Q17 7 18 5"
                  stroke="#FF6B47"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
                <Path
                  d="M10 3 Q11 1 12 3 Q13 5 14 3"
                  stroke="#FF6B47"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
              </>
            )}
          </Svg>
        );

      case 'sparkly-cone':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            {/* Cone */}
            <Path
              d="M9 12 L12 21 L15 12 Z"
              fill="#D2691E"
              stroke="#8B4513"
              strokeWidth="1.2"
            />
            {/* Cone texture lines */}
            <Path
              d="M10 14 L13 14 M10.5 16 L12.5 16 M11 18 L12 18"
              stroke="#8B4513"
              strokeWidth="0.8"
            />
            {/* Ice cream scoop */}
            <Circle
              cx="12"
              cy="9"
              r="5"
              fill={color}
              stroke="#FFF"
              strokeWidth="1.5"
            />
            {/* Highlight */}
            <Ellipse
              cx="10.5"
              cy="7"
              rx="1.8"
              ry="2.5"
              fill="#FFFFFF"
              opacity="0.5"
            />
            {/* Small highlight dot */}
            <Circle
              cx="13.5"
              cy="10"
              r="0.8"
              fill="#FFFFFF"
              opacity="0.6"
            />
            {/* Always visible sparkles around the cone */}
            <Circle cx="7" cy="7" r="0.6" fill="#FFD700" opacity="0.8" />
            <Circle cx="17" cy="8" r="0.8" fill="#FFD700" opacity="0.9" />
            <Circle cx="16" cy="5" r="0.5" fill="#FFD700" opacity="0.7" />
            <Circle cx="8" cy="11" r="0.4" fill="#FFD700" opacity="0.6" />
            <Circle cx="6" cy="10" r="0.5" fill="#FFD700" opacity="0.8" />
            <Circle cx="18" cy="11" r="0.6" fill="#FFD700" opacity="0.7" />
            
            {/* Extra sparkles when focused */}
            {focused && (
              <>
                <Circle cx="5" cy="8" r="0.7" fill="#FFD700" opacity="0.9" />
                <Circle cx="19" cy="6" r="0.6" fill="#FFD700" opacity="0.8" />
                <Circle cx="15" cy="3" r="0.5" fill="#FFD700" opacity="0.7" />
                <Circle cx="9" cy="4" r="0.6" fill="#FFD700" opacity="0.8" />
                <Circle cx="6" cy="13" r="0.4" fill="#FFD700" opacity="0.6" />
                <Circle cx="18" cy="13" r="0.5" fill="#FFD700" opacity="0.7" />
                {/* Sparkle animation effect */}
                <Circle cx="12" cy="5" r="0.8" fill="#FFD700" opacity="0.9" />
              </>
            )}
          </Svg>
        );

      case 'ice-cream-cone':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            {/* Cone */}
            <Path
              d="M9 12 L12 21 L15 12 Z"
              fill="#D2691E"
              stroke="#8B4513"
              strokeWidth="1.2"
            />
            {/* Cone texture lines */}
            <Path
              d="M10 14 L13 14 M10.5 16 L12.5 16 M11 18 L12 18"
              stroke="#8B4513"
              strokeWidth="0.8"
            />
            {/* Ice cream scoop */}
            <Circle
              cx="12"
              cy="9"
              r="5"
              fill={color}
              stroke="#FFF"
              strokeWidth="1.5"
            />
            {/* Highlight */}
            <Ellipse
              cx="10.5"
              cy="7"
              rx="1.8"
              ry="2.5"
              fill="#FFFFFF"
              opacity="0.5"
            />
            {/* Small highlight dot */}
            <Circle
              cx="13.5"
              cy="10"
              r="0.8"
              fill="#FFFFFF"
              opacity="0.6"
            />
            {/* Sparkles when focused */}
            {focused && (
              <>
                <Circle cx="8" cy="7" r="0.8" fill="#FFD700" opacity="0.9" />
                <Circle cx="16" cy="6" r="0.6" fill="#FFD700" opacity="0.8" />
                <Circle cx="15" cy="11" r="0.5" fill="#FFD700" opacity="0.7" />
              </>
            )}
          </Svg>
        );

      case 'ice-cream-scoop':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            {/* Main scoop */}
            <Circle
              cx="12"
              cy="12"
              r="7"
              fill={color}
              stroke="#FFF"
              strokeWidth="2"
            />
            {/* Secondary smaller scoop */}
            <Circle
              cx="12"
              cy="8"
              r="4"
              fill={color}
              opacity="0.9"
            />
            {/* Highlight on main scoop */}
            <Circle
              cx="10"
              cy="10"
              r="2.2"
              fill="#FFFFFF"
              opacity="0.6"
            />
            {/* Highlight on small scoop */}
            <Circle
              cx="11"
              cy="6.5"
              r="1.2"
              fill="#FFFFFF"
              opacity="0.5"
            />
            {/* Small highlight dots */}
            <Circle
              cx="15"
              cy="14"
              r="0.8"
              fill="#FFFFFF"
              opacity="0.7"
            />
            <Circle
              cx="14"
              cy="8"
              r="0.6"
              fill="#FFFFFF"
              opacity="0.6"
            />
            {/* Sparkles when focused */}
            {focused && (
              <>
                <Circle cx="7" cy="9" r="0.6" fill="#FFD700" opacity="0.9" />
                <Circle cx="17" cy="10" r="0.8" fill="#FFD700" opacity="0.8" />
                <Circle cx="12" cy="4" r="0.5" fill="#FFD700" opacity="0.7" />
                <Circle cx="8" cy="15" r="0.4" fill="#FFD700" opacity="0.6" />
              </>
            )}
          </Svg>
        );

      case 'ice-cream-sundae':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            {/* Bowl */}
            <Path
              d="M6 14 C6 17 8.5 19 12 19 C15.5 19 18 17 18 14 L18 12 L6 12 Z"
              fill="#FFB6C1"
              stroke="#FF69B4"
              strokeWidth="1"
            />
            {/* Ice cream scoops */}
            <Circle cx="12" cy="10" r="3.5" fill={color} />
            <Circle cx="12" cy="6.5" r="2.5" fill="#87CEEB" />
            {/* Cherry on top */}
            <Circle cx="12" cy="3.5" r="1.2" fill="#DC143C" />
            {/* Cherry stem */}
            <Path
              d="M12 2.3 Q11.5 1.5 11 1"
              stroke="#228B22"
              strokeWidth="1"
              fill="none"
            />
            {/* Sparkles when focused */}
            {focused && (
              <>
                <Circle cx="9" cy="7" r="0.5" fill="#FFD700" />
                <Circle cx="15" cy="9" r="0.5" fill="#FFD700" />
                <Circle cx="8" cy="12" r="0.5" fill="#FFD700" />
                <Circle cx="16" cy="12" r="0.5" fill="#FFD700" />
              </>
            )}
          </Svg>
        );

      default:
        return null;
    }
  };

  return <View style={{ transform: [{ scale }] }}>{renderIcon()}</View>;
};
