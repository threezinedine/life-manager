import { useState } from 'react';
import styles from './avatar.module.scss';
import clsx from 'clsx';

export type AvatarSize = 'small' | 'medium' | 'large' | 'full-width';

export type AvatarStatus = 'online' | 'offline' | 'busy';

export interface AvatarProps {
	src?: string;
	alt?: string;
	name?: string;
	size?: AvatarSize;
	status?: AvatarStatus;
	borderRadius?: AvatarSize;
	className?: string;
}

function getInitials(name: string): string {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((n) => n[0])
		.join('')
		.toUpperCase();
}

export default function Avatar({
	src,
	alt,
	name,
	size = 'medium',
	status,
	borderRadius = 'medium',
	className,
}: AvatarProps) {
	const [imgError, setImgError] = useState(false);

	const showImage = src && !imgError;
	const showFallback = !showImage && name;

	const classes = clsx(
		styles.avatar,
		styles[size],
		{ [styles['full-width']]: borderRadius === 'full-width' },
		className,
	);

	const avatar = (
		<div className={classes} role="img" aria-label={alt ?? name ?? 'Avatar'}>
			{showImage ? (
				<img src={src} alt={alt ?? name ?? ''} onError={() => setImgError(true)} />
			) : showFallback ? (
				<span className={styles.fallback}>{getInitials(name)}</span>
			) : null}
		</div>
	);

	if (!status) return avatar;

	return (
		<span className={styles.wrapper}>
			{avatar}
			<span className={clsx(styles.status, styles[status])} />
		</span>
	);
}
