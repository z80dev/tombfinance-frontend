import React, { useCallback } from 'react';
import { AlertCircle } from 'react-feather';
import styled from 'styled-components';

const RowNoFlex = styled.div`
  flex-wrap: nowrap;
`;

export default function ErrorPopup({ message, stack }: { message: string; stack: string }) {
  const copyErrorDetails = useCallback(async () => {
    await navigator.clipboard.writeText(`${message}\n${stack}`);
  }, [message, stack]);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        <AlertCircle color="#FF6871" size={24} />
      </div>
      <div>
        <StyledPopupDesc>{message}</StyledPopupDesc>
        <StyledLink onClick={copyErrorDetails} href="#">
          Copy error details
        </StyledLink>
      </div>
    </RowNoFlex>
  );
}

const StyledPopupDesc = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[500]};
`;
