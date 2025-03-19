import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,j as n,o as e}from"./app-Ls6hpg4N.js";const l={};function h(t,s){return e(),a("div",null,s[0]||(s[0]=[n(`<p>变量名、函数均采用小驼峰 abc, isName<br> 除了函数声明外，类名、枚举等均采用大驼峰 MyPackage<br> 文件名采用 snake型 a_b_c</p><h2 id="通用规则" tabindex="-1"><a class="header-anchor" href="#通用规则"><span>通用规则</span></a></h2><ul><li>变量名必须使用小写字母开头，并遵循 snake_case 风格。</li><li>避免使用单字母变量名（除非是循环变量 i, j, k）。</li><li>不要使用缩写，除非是广泛接受的缩写（如 id, url, cpu）。</li><li>布尔变量尽量使用 is_ / has_ / can_ 开头，如：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> is_enabled: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> has_access: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> can_execute: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>计数器变量以 _count 结尾：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> user_count: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">100</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> retry_count: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对于多行定义（&gt;=3），建议只使用一个关键字：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    user_count: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">100</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    has_access: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    can_execute: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常量命名规则" tabindex="-1"><a class="header-anchor" href="#常量命名规则"><span>常量命名规则</span></a></h2><ul><li>使用 UPPER_CASE_SNAKE_CASE：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> MAX_RETRY: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> DEFAULT_TIMEOUT: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">30</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> PI: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3.141592653</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数-方法命名" tabindex="-1"><a class="header-anchor" href="#函数-方法命名"><span>函数 &amp; 方法命名</span></a></h2><ul><li>使用 snake_case，动词开头：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> get_user_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">user_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) -&gt; </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> send_request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) -&gt; response</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> validate_email</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">email</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) -&gt; </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果是 setter/getter，使用 set_ / get_ 前缀：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> set_username</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">new_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> get_username</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() -&gt; </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结构体-类命名" tabindex="-1"><a class="header-anchor" href="#结构体-类命名"><span>结构体 &amp; 类命名</span></a></h2><ul><li>builtin的基础类型都统一为小写, str、num、list、set、map...</li><li>使用 PascalCase：</li></ul><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">struct UserProfile {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    username: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    email: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    age: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>字段使用 snake_case：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>struct ServerConfig {</span></span>
<span class="line"><span>    host: str</span></span>
<span class="line"><span>    port: num</span></span>
<span class="line"><span>    is_https: bool</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="枚举命名" tabindex="-1"><a class="header-anchor" href="#枚举命名"><span>枚举命名</span></a></h2><ul><li>枚举类型使用 PascalCase，枚举项使用 SCREAMING_SNAKE_CASE：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>enum UserRole {</span></span>
<span class="line"><span>    ADMIN</span></span>
<span class="line"><span>    EDITOR</span></span>
<span class="line"><span>    VIEWER</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命名禁忌" tabindex="-1"><a class="header-anchor" href="#命名禁忌"><span>命名禁忌</span></a></h2><p>🚫 不要使用：</p><ul><li>无意义的变量名 (x, y, data, temp)</li><li>魔法数（直接使用 3.14，应使用 PI）</li><li>拼音或非英语变量名（除非特殊场景）</li><li>缩写过多的变量名（如 usrCfg 应该用 user_config）</li><li>与关键字冲突的变量名（如 fn, let, const）</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> DEFAULT_RETRIES: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">struct DatabaseConfig {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    host: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    port: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    username: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    password: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">str</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    max_connections: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> connect_to_db</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: DatabaseConfig) -&gt; </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> config.max_connections &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> get_user_role</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">user_id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) -&gt; UserRole {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> UserRole.ADMIN</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29)]))}const r=i(l,[["render",h],["__file","spec.html.vue"]]),d=JSON.parse('{"path":"/handbook/base/spec.html","title":"Specification","lang":"en-US","frontmatter":{"title":"Specification","icon":"fas fa-box","description":"变量名、函数均采用小驼峰 abc, isName 除了函数声明外，类名、枚举等均采用大驼峰 MyPackage 文件名采用 snake型 a_b_c 通用规则 变量名必须使用小写字母开头，并遵循 snake_case 风格。 避免使用单字母变量名（除非是循环变量 i, j, k）。 不要使用缩写，除非是广泛接受的缩写（如 id, url, cpu）。 ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/hulo.dev/handbook/base/spec.html"}],["meta",{"property":"og:site_name","content":"Docs Demo"}],["meta",{"property":"og:title","content":"Specification"}],["meta",{"property":"og:description","content":"变量名、函数均采用小驼峰 abc, isName 除了函数声明外，类名、枚举等均采用大驼峰 MyPackage 文件名采用 snake型 a_b_c 通用规则 变量名必须使用小写字母开头，并遵循 snake_case 风格。 避免使用单字母变量名（除非是循环变量 i, j, k）。 不要使用缩写，除非是广泛接受的缩写（如 id, url, cpu）。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-19T00:07:31.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-19T00:07:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Specification\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-19T00:07:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"The Hulo Authors\\",\\"url\\":\\"https://github.com/hulo-io\\"}]}"]]},"git":{"createdTime":1742342851000,"updatedTime":1742342851000,"contributors":[{"name":"ansurfen","username":"ansurfen","email":"axf593161@gmail.com","commits":1,"url":"https://github.com/ansurfen"}]},"readingTime":{"minutes":1.45,"words":436},"filePathRelative":"handbook/base/spec.md","localizedDate":"March 19, 2025","autoDesc":true}');export{r as comp,d as data};
