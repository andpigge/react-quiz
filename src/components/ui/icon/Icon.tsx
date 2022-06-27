import React, { FC, SVGProps } from 'react';

import icons from '../../../shared/icons';

export interface IIconProps extends SVGProps<SVGSVGElement> {
  glyph: keyof typeof icons,
}

export const Icon: FC<IIconProps> = (props) => {
	const {
		glyph,
		fill = 'currentColor',
		...restIconProps
	} = props;
	const IconComponent = icons[glyph];

	return (
		<IconComponent
			fill={fill}
			{...restIconProps}
		/>
	);
};
