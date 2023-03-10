import React, {PropsWithChildren, useCallback, useRef} from 'react';
import {FiChevronLeft, FiChevronRight, FiRefreshCw, FiXCircle} from 'react-icons/fi';
import {FaDev} from 'react-icons/fa';
import {SESSION_URL_UNSET} from '../constants/sessions';

export default function WebView({url, uid}: PropsWithChildren<{url: string; uid: string}>) {
  const webviewRef = useRef<Electron.WebviewTag>(null);

  const handleBack = useCallback(() => webviewRef.current?.goBack(), [webviewRef]);
  const handleForward = useCallback(() => webviewRef.current?.goForward(), [webviewRef]);
  const handleReload = useCallback(() => webviewRef.current?.reload(), [webviewRef]);
  const handleDevTools = useCallback(() => webviewRef.current?.openDevTools(), [webviewRef]);
  const handleClose = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    store.dispatch({
      type: SESSION_URL_UNSET,
      uid
    });
  }, []);

  return (
    <>
      <webview
        ref={webviewRef}
        src={url}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        allowpopups="true"
        style={{
          background: '#fff',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-flex',
          width: '100%',
          height: '100%'
        }}
      />
      <nav className="webview_menu">
        <ul>
          <li onClick={handleBack}>
            <FiChevronLeft />
          </li>
          <li onClick={handleForward}>
            <FiChevronRight />
          </li>
          <li onClick={handleReload}>
            <FiRefreshCw />
          </li>
          <li onClick={handleDevTools}>
            <FaDev />
          </li>
          <li onClick={handleClose}>
            <FiXCircle />
          </li>
        </ul>
      </nav>

      <style jsx global>{`
        .webview_menu {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          padding: 4px 12px;
          border-radius: 24px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .webview_menu ul {
          display: flex;
          flex-direction: row;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .webview_menu li {
          padding: 12px 12px 8px 12px;
          border-radius: 100%;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .webview_menu li:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
