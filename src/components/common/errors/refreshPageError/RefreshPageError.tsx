import React from 'react';
import ErrorEngineer from 'resources/icons/errro-engineer.svg';
import Button from '@boclips-ui/button';
import { Hero } from 'src/components/hero/Hero';

interface Props {
  row?: string;
}

const RefreshPageError = ({ row }: Props) => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return (
    <Hero
      icon={<ErrorEngineer />}
      row={row}
      title="Sorry, it’s not you! It’s us."
      description="There was an error processing your request. Please try once again. If this continues, please contact us at support@boclips.com"
      actions={
        <>
          <Button
            onClick={refreshHandler}
            text="Refresh page"
            height="44px"
            width="145px"
          />
          <div className="font-medium ml-6 blue-800 text-base ">
            <a href="mailto:support@boclips.com">Contact support</a>
          </div>
        </>
      }
    />
  );
};

export default RefreshPageError;
