import styled from 'styled-components';
import { PageContainer } from '../global-styles';

export const DetailsViewContainer = styled(PageContainer)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .relates-area {
    width: 400px;
    min-width: 400px;
    margin-left: 10px;
    @media (max-width: 1024px) {
      width: 100%;
      min-width: 300px;
      margin: 20px 0 0 0;
    }
  }
`;
