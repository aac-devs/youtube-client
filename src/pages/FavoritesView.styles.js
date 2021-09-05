import styled from 'styled-components';
import { PageContainer } from '../global-styles';

export const FavoritesViewContainer = styled(PageContainer)`
  max-width: 1200px;

  .no-favorites {
    color: ${({ theme }) => theme.text.titleColor};
    text-align: center;
    font-size: 28px;
    font-weight: 500;
  }
`;
