import { useLanguage } from '../LanguageContext.jsx'
import './DictionaryEntry.css'

function DictionaryEntry({ entry }) {
  const { t } = useLanguage()
  if (!entry) return null
  const { phonetic, definitions, example } = entry

  return (
    <article className="dictionaryEntry">
      {phonetic && (
        <section className="phoneticSection" aria-labelledby="phon-title">
          <h2 id="phon-title" className="sectionTitle">【{t.phoneticLabel}】</h2>
          <p className="phonetic">{phonetic}</p>
        </section>
      )}
      {definitions && definitions.length > 0 ? (
        <section className="definitions" aria-labelledby="def-title">
          <h2 id="def-title" className="sectionTitle">【{t.definitionsLabel}】</h2>
          <ol>
            {definitions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </section>
      ) : (
        <p className="noDefinition">{t.noDefinition}</p>
      )}
      {example && (
        <section className="example" aria-labelledby="ex-title">
          <h2 id="ex-title" className="sectionTitle">【{t.exampleLabel}】</h2>
          <blockquote>{example}</blockquote>
        </section>
      )}
    </article>
  )
}

export default DictionaryEntry
