import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getOrInitialStores } from '@wertyga/wx';
import * as stores from '../stores';

export const HOCRoute = ({ children, pagePath, getServerSideData }) => {
	const location = useLocation();
	
	const handleServerData = async getServerSideData => {
		try {
			const wxStore = getOrInitialStores(stores, {
				fetchClient: axios,
			});
			await getServerSideData({
				req: {
					path: location.pathname,
					url: location.pathname + location.search,
					...location,
				},
				wxStore,
			});
		} catch (e) {
			console.error(e);
		}
	};
	
	useEffect(() => {
		if (getServerSideData && (window as any).initialPage !== pagePath) {
			handleServerData(getServerSideData);
		}
	}, [location.pathname]);
	
	return children;
};
