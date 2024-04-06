import React, {useEffect, useState} from 'react';
export default function Meals() {
	const [loadedMeals, setLoadedMeals] = useState([]);
	const [isLoadingMeals, setIsLoadingMeals] = useState(false);
	useEffect(() => {
		setIsLoadingMeals(true);
		async function fetchMeals() {
			const response = await fetch('http://localhost:3000/meals');

			if (!response.ok) {
				//
			}

			const meals = await response.json();
			setLoadedMeals(meals);
			setIsLoadingMeals(false);
		}

		fetchMeals();
	}, []);

	return <ul id='meals'>
		{loadedMeals.map(meal => <li key={meal.id}>{meal.name}</li>)}
	</ul>;
}
