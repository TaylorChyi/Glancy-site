import { useLanguage } from '../LanguageContext.jsx'
import './DictionaryEntry.css'

function DictionaryEntry({ entry }) {
  const { t } = useLanguage()
  if (!entry) return null

  // new format detected by the presence of Chinese keys
  const isNew = Object.prototype.hasOwnProperty.call(entry, '发音解释')

  if (!isNew) {
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

  const term = entry['词条']
  const variants = entry['变形'] || []
  const phonetic = entry['发音'] || {}
  const groups = entry['发音解释'] || []
  const phrases = entry['常见词组'] || []

  const synLabel = t.synonymsLabel || '同义词'
  const antLabel = t.antonymsLabel || '反义词'
  const relLabel = t.relatedLabel || '相关词'
  const varLabel = t.variantsLabel || '变形'
  const phrLabel = t.phrasesLabel || '常见词组'

  const phoneticText = [phonetic['英音'], phonetic['美音']]
    .filter(Boolean)
    .join(' / ')

  const defs = groups.flatMap((g) => g.释义 || [])

  return (
    <article className="dictionaryEntry">
      {term && <h2 className="sectionTitle">{term}</h2>}
      {phoneticText && (
        <section className="phoneticSection" aria-labelledby="phon-title">
          <h2 id="phon-title" className="sectionTitle">【{t.phoneticLabel}】</h2>
          <p className="phonetic">{phoneticText}</p>
        </section>
      )}
      {variants.length > 0 && (
        <section className="variants" aria-labelledby="var-title">
          <h2 id="var-title" className="sectionTitle">【{varLabel}】</h2>
          <ul>
            {variants.map((v, i) => (
              <li key={i}>
                {v.状态}：{v.词形}
              </li>
            ))}
          </ul>
        </section>
      )}
      {defs.length > 0 ? (
        <section className="definitions" aria-labelledby="def-title">
          <h2 id="def-title" className="sectionTitle">【{t.definitionsLabel}】</h2>
          <ol>
            {defs.map((d, i) => (
              <li key={i}>
                <div>{d.定义}</div>
                {d.类别 && <div className="pos">{d.类别}</div>}
                {d.关系词 && (
                  <div className="relations">
                    {d.关系词.同义词?.length > 0 && (
                      <div>
                        {synLabel}: {d.关系词.同义词.join(', ')}
                      </div>
                    )}
                    {d.关系词.反义词?.length > 0 && (
                      <div>
                        {antLabel}: {d.关系词.反义词.join(', ')}
                      </div>
                    )}
                    {d.关系词.相关词?.length > 0 && (
                      <div>
                        {relLabel}: {d.关系词.相关词.join(', ')}
                      </div>
                    )}
                  </div>
                )}
                {d.例句?.length > 0 && (
                  <ul className="examples">
                    {d.例句.map((ex, j) => (
                      <li key={j}>
                        <blockquote>{ex.源语言}</blockquote>
                        <blockquote>{ex.翻译}</blockquote>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <p className="noDefinition">{t.noDefinition}</p>
      )}
      {phrases.length > 0 && (
        <section className="phrases" aria-labelledby="phr-title">
          <h2 id="phr-title" className="sectionTitle">【{phrLabel}】</h2>
          <ul>
            {phrases.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export default DictionaryEntry
