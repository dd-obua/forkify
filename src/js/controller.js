import '../styles/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import icons from '../images/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const controlRecipes = async () => {
  try {
    // Get id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

['load', 'hashchange'].forEach((event) => window.addEventListener(event, controlRecipes));
