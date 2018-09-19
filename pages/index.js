import {Plural, Trans} from '@lingui/macro';
import {I18nProvider} from '@lingui/react';
import catalogs from '../locale/catalogues';

const name = 'BxJS';
const messagesCount = 2;

export default class Index extends React.Component {
  static async getInitialProps({req}) {
    const userLanguagesString = req ? req.headers['accept-language'] : navigator.acceptLanguage;
    const userLanguages =
      ['de'] ||
      userLanguagesString
        .split(';')
        .map(lang => lang.split(',').pop())
        .filter(lang => !lang.includes('='));
    return {userLanguages};
  }

  render() {
    const currentLanguage = this.props.userLanguages[0];

    return (
      <I18nProvider language={currentLanguage} catalogs={catalogs}>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Trans id="Hello {name}" values={{name}} />
              </h1>
              <h2>
                <Plural
                  value={messagesCount}
                  one="There's # message in your inbox"
                  other="There're # messages in your inbox"
                />
              </h2>
              <p>Lang: {currentLanguage}</p>
            </div>
          </div>
        </section>
      </I18nProvider>
    );
  }
}
