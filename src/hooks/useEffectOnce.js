/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react';

/**
 *  @description: custom implementation of useEffect to run once prior to React v18
 * */
export const useEffectOnce = (effect) => {
	const destroyFunc = useRef();
	const effectCalled = useRef(false);
	const renderAfterCalled = useRef(false);
	const [val, setVal] = useState(0);

	if (effectCalled.current) {
		renderAfterCalled.current = true;
	}

	useEffect(() => {
		// only execute the effect first time around
		if (!effectCalled.current) {
			destroyFunc.current = effect();
			effectCalled.current = true;
		}

		// this forces one render after the effect is run
		setVal(val + 1);

		return () => {
			// if the comp didn't render since the useEffect was called,
			// we know it's the dummy React cycle
			if (!renderAfterCalled.current) {
				return;
			}
			if (destroyFunc.current) {
				destroyFunc.current();
			}
		};
	}, []);
};
