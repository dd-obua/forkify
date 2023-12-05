import * as model from './model.js';
import recipeView from './views/recipeView.js';

import '../styles/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async () => {
  try {
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

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};

init();
