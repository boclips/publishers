import React from 'react';

interface Props {
  price: string;
}

export const PriceBadge = ({ price }: Props) => (
  <span className="font-bold text-xl">{price}</span>
);
