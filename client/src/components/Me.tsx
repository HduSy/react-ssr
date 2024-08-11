import React from 'react';
interface Props {
  name: string;
  avatar: string;
}
export default function (props: Props) {
  const { name, avatar } = props;
  return (
    <>
      <div>
        <img src={avatar} alt={name} />
        <span>{name}</span>
      </div>
    </>
  );
}
