import { type FC } from 'react';
import styles from './styles.module.scss';
import { Placeholder } from '@/shared/ui/kit';
import { type Recipe } from '@/entities/recipe/model/types';
import { RecipeCard } from '@/entities/recipe';

type RecipeListProps = {
  recipes: Recipe[];
  onCreateRecipe: () => void;
  onChangeRecipe?: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipe: Recipe) => void;
};

export const RecipeList: FC<RecipeListProps> = ({
  recipes,
  onCreateRecipe,
  onChangeRecipe,
  onDeleteRecipe,
}) => {
  if (!recipes.length) {
    return (
      <Placeholder
        onClick={onCreateRecipe}
        title="Упс, ничего не нашлось"
        description="Попробуй создать свой первый рецепт прямо сейчас!"
        buttonText="Добавить рецепт"
      />
    );
  }
  return (
    <div className={styles['recipe-list']}>
      {recipes.map((recipe) => {
        const { id } = recipe;

        return (
          <RecipeCard
            key={id}
            onChange={onChangeRecipe}
            onDelete={onDeleteRecipe}
            recipe={recipe}
          />
        );
      })}
    </div>
  );
};
