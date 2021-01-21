import MyAccountSVG from 'src/resources/icons/my-account-icon.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import { Link } from 'react-router-dom';
import { Loading } from 'src/components/common/Loading';
import c from 'classnames';
import BoclipsSecurity from 'boclips-js-security';
import { Constants } from 'src/AppConstants';
import s from './style.module.less';

export const AccountButton = () => {
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const { data, isLoading } = useGetUserQuery();
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplayModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const onClick = () => {
    setDisplayModal(!displayModal);
  };

  const onMouseEnterAction = () => {
    setOnMouseEnter(true);
  };
  const onMouseLeaveAction = () => {
    setOnMouseEnter(false);
  };

  const renderModal = () => {
    if (isLoading && displayModal) {
      return (
        <div ref={ref} className={s.tooltip}>
          <Loading />
        </div>
      );
    }
    return (
      displayModal && (
        <div ref={ref} className={s.tooltip}>
          <div className="font-medium">
            {data.firstName} {data.lastName}
          </div>
          <div className="text-xs text-gray-700">{data.email}</div>
          <div className="pt-4 text-sm">
            <Link to="/orders">Your orders</Link>
          </div>
          <div className="pt-1 text-sm">
            <button
              type="button"
              onClick={() =>
                BoclipsSecurity.getInstance().logout({
                  redirectUri: `${Constants.HOST}/`,
                })
              }
            >
              Log out
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <div
        role="presentation"
        onMouseEnter={onMouseEnterAction}
        onMouseLeave={onMouseLeaveAction}
        className={c(s.account, { [s.active]: displayModal || onMouseEnter })}
        onClick={onClick}
      >
        <MyAccountSVG />
        <span className="text-xs mt-1 font-medium">Account</span>
      </div>
      {renderModal()}
    </>
  );
};
