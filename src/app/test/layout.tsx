import React from 'react';
import AuthGuard from '@/components/Guard/AuthGuard';

const TestLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthGuard>
			<div className={'bg-amber-200'}>{children}</div>
		</AuthGuard>
	);
};

export default TestLayout;
