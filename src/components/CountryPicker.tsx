import * as React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import styled from 'styled-components';
import 'react-flags-select/css/react-flags-select.css';

import Error from './Error';
import Loading from './Loading';
import Stats from './Stats';
import useDataApi from '../hooks/useDataApi';
import { ICountryResponse } from '../types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CountrySection = styled.section`
  margin-top: 1rem;
`;

const WrapperSelect = styled.div`
  .flag-select {
    margin: 10px;
    .filterBox input {
      padding: 5px;
      font-size: 13px;
      border: 1px solid ${({ theme }) => theme.colors.text};
    }
  }
  .flag-select__btn {
    background: ${({ theme }) => theme.colors.backgroundLight};
    outline: 0;
    color: ${({ theme }) => theme.colors.text};
    ::after {
      border-top: 5px solid ${({ theme }) => theme.colors.text};
    }
  }
  .flag-select__options {
    border: 1px solid ${({ theme }) => theme.colors.background};
    border-radius: 0;
    background: ${({ theme }) => theme.colors.backgroundLight};
    max-height: 300px;
  }
`;

const CountryPicker = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('ID');

  const [{ data, isLoading, isError }] = useDataApi<ICountryResponse>({
    initUrl: `${API_ENDPOINT}/countries`,
    defaultData: {},
  });

  if (isLoading) {
    return <Loading speed={300} />;
  }

  if (isError) {
    return <Error message="Something problem" />;
  }

  return (
    <CountrySection className="center-text">
      {data && data.iso3 && (
        <>
          <WrapperSelect>
            <ReactFlagsSelect
              searchable={true}
              defaultCountry={selectedCountry}
              onSelect={code => setSelectedCountry(data.iso3[code])}
            />
          </WrapperSelect>
          <Stats
            title=""
            url={`${API_ENDPOINT}/countries/${selectedCountry}`}
          />
        </>
      )}
    </CountrySection>
  );
};

export default CountryPicker;
