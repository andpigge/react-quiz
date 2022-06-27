import React from 'react';
import classNames from 'classnames/bind';
import styles from './app.module.scss';

import { Icon } from './ui/icon';

const cx = classNames.bind(styles);

const App: React.FC = () => (
	<div>
		<Icon
			glyph="comments"
		/>
		<h1 className={cx('h1')}>
			Тестовая строка
		</h1>
	</div>
);

export default App;
