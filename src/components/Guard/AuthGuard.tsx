'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTimeout } from 'usehooks-ts';

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const test = searchParams.get('test');
	useTimeout(() => router.push('/'), 0);
	if (test) {
		return null;
	}
	return <>{props.children}</>;
};

export default AuthGuard;
