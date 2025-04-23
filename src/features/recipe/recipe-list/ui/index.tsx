import { useState, type FC } from 'react';
import styles from './styles.module.scss';
import { Button, CheckBox, Placeholder } from '@/shared/ui/kit';
import { RecipeCard } from '@/entities/recipe';
import { type Recipe } from '@/shared/types/entities';

type RecipeListProps = {
  recipes: Recipe[];
  onCreateRecipe?: () => void;
  onChangeRecipe?: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipe: Recipe) => void;
  selectable?: boolean;
  onSelectRecipes?: (recipes: Recipe[]) => void;
};

export const RecipeList: FC<RecipeListProps> = ({
  recipes,
  onCreateRecipe,
  onChangeRecipe,
  onDeleteRecipe,
  selectable,
  onSelectRecipes,
}) => {
  const [selected, setSelected] = useState<Recipe[]>([]);

  const handleSelect = (product: Recipe, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, product] : prev.filter((p) => p.id !== product.id)));
  };

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
      <div className={styles.content}>
        {recipes.map((recipe) => {
          const { id } = recipe;

          const Recipe = () => (
            <RecipeCard
              key={id}
              onChange={onChangeRecipe}
              onDelete={onDeleteRecipe}
              recipe={recipe}
              selectable={selectable}
            />
          );

          if (selectable) {
            return (
              <CheckBox
                onChange={(e) => {
                  handleSelect(recipe, e.target.checked);
                }}
              >
                <Recipe />
              </CheckBox>
            );
          }
          return <Recipe />;
        })}
      </div>

      {selectable && (
        <Button className={styles.button} onClick={() => onSelectRecipes?.(selected)}>
          Выбрать
        </Button>
      )}
    </div>
  );
};
