import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,j as n,o as t}from"./app--tMmQx5k.js";const e={};function l(h,s){return t(),a("div",null,s[0]||(s[0]=[n(`<h2 id="if" tabindex="-1"><a class="header-anchor" href="#if"><span>if</span></a></h2><h3 id="单分支" tabindex="-1"><a class="header-anchor" href="#单分支"><span>单分支</span></a></h3><p><strong>输入：</strong></p><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> age</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">num</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $age</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">18</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;you are an adult&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">age</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$age</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -gt</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 18</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ];</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;you are an adult&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多分支" tabindex="-1"><a class="header-anchor" href="#多分支"><span>多分支</span></a></h3><p><strong>输入：</strong></p><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$score</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 60</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $score</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">90</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: excellent&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $score</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">75</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: good&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $score</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: Pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: fail&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">score</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">85</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$score</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -ge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 90</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: excellent&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">elif</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$score</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -ge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 75</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: good&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">elif</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$score</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> -ge</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: Pass&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">  echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Grade: fail&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令"><span>命令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if ! cmd {</span></span>
<span class="line"><span>    echo &quot;cmd not found&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if $(cmd) == &quot;0&quot; {</span></span>
<span class="line"><span>    echo &quot;successfully to execute&quot;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原生集成" tabindex="-1"><a class="header-anchor" href="#原生集成"><span>原生集成</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if \${} {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判断表达式" tabindex="-1"><a class="header-anchor" href="#判断表达式"><span>判断表达式</span></a></h3><h4 id="整数比较" tabindex="-1"><a class="header-anchor" href="#整数比较"><span>整数比较</span></a></h4><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>只能用于整数</p></div><table><thead><tr><th>表达式</th><th>含义</th><th>等价于</th></tr></thead><tbody><tr><td><code>-eq</code></td><td>等于</td><td>==</td></tr><tr><td><code>-ne</code></td><td>不等于</td><td>!=</td></tr><tr><td><code>-gt</code></td><td>大于</td><td>&gt;</td></tr><tr><td><code>-ge</code></td><td>大于等于</td><td>&gt;=</td></tr><tr><td><code>-lt</code></td><td>小于</td><td>&lt;</td></tr><tr><td><code>-le</code></td><td>小于等于</td><td>&lt;=</td></tr></tbody></table><h4 id="字符串判断" tabindex="-1"><a class="header-anchor" href="#字符串判断"><span>字符串判断</span></a></h4><table><thead><tr><th>表达式</th><th>含义</th><th>等价于</th></tr></thead><tbody><tr><td>-z &quot;$str&quot;</td><td>字符串长度为 0（空字符串）</td><td>$str.length == 0 或 ! $str.length</td></tr><tr><td>-n &quot;$str&quot;</td><td>字符串长度不为 0</td><td>$str.length != 0 或 $str.length</td></tr><tr><td>&quot;$a&quot; = &quot;$b&quot;</td><td>字符串相等</td><td>$a == $b</td></tr><tr><td>&quot;$a&quot; != &quot;$b&quot;</td><td>字符串不相等</td><td>$a != $b</td></tr></tbody></table><h4 id="逻辑判断" tabindex="-1"><a class="header-anchor" href="#逻辑判断"><span>逻辑判断</span></a></h4><table><thead><tr><th>表达式</th><th>含义</th><th>等价于</th></tr></thead><tbody><tr><td><code>-a</code></td><td>与</td><td>&amp;</td></tr><tr><td><code>-o</code></td><td>或</td><td>|</td></tr><tr><td><code>!</code></td><td>非</td><td>!</td></tr><tr><td><code>&amp;&amp;</code></td><td>条件与（用于多个 <code>[ ... ]</code>）</td><td>&amp;&amp;</td></tr></tbody></table><h4 id="文件相关" tabindex="-1"><a class="header-anchor" href="#文件相关"><span>文件相关</span></a></h4><table><thead><tr><th>表达式</th><th>含义</th><th>等价于</th></tr></thead><tbody><tr><td><code>-e</code></td><td>文件存在</td><td>f&quot;file.txt&quot;.exist</td></tr><tr><td><code>-f</code></td><td>是普通文件（非目录）</td><td>f&quot;file.txt&quot;.is_file 或 ! f&quot;file.txt&quot;.is_dir</td></tr><tr><td><code>-d</code></td><td>是目录</td><td>f&quot;dir/&quot;.is_dir()</td></tr><tr><td><code>-r</code></td><td>文件可读</td><td>f&quot;file.txt&quot;.readable</td></tr><tr><td><code>-w</code></td><td>文件可写</td><td>f&quot;file.txt&quot;.writable</td></tr><tr><td><code>-x</code></td><td>文件可执行</td><td>f&quot;<a href="http://script.sh" target="_blank" rel="noopener noreferrer">script.sh</a>&quot;.executable</td></tr><tr><td><code>-s</code></td><td>文件大小非 0</td><td>f&quot;file.txt&quot;.size</td></tr><tr><td><code>-L</code></td><td>是符号链接</td><td>f&quot;link.txt&quot;.is_symbol_link</td></tr><tr><td><code>-h</code></td><td>同 -L，也是符号链接</td><td>f&quot;link.txt&quot;.is_symbol_link</td></tr><tr><td><code>-b</code></td><td>是块设备文件</td><td>f&quot;/dev/sda&quot;.is_block_dev</td></tr><tr><td><code>-c</code></td><td>是字符设备文件</td><td>f&quot;/dev/tty0&quot;.is_char_dev</td></tr><tr><td><code>-p</code></td><td>是命名管道（FIFO）</td><td>f&quot;fifo.pipe&quot;.is_pipe</td></tr><tr><td><code>-S</code></td><td>是 socket 文件</td><td>f&quot;/tmp/mysock&quot;.is_sock</td></tr><tr><td><code>-u</code></td><td>设置了 SUID 位</td><td>f&quot;somefile&quot;.suid</td></tr><tr><td><code>-g</code></td><td>设置了 SGID 位</td><td>f&quot;somefile&quot;.sgid</td></tr><tr><td><code>-k</code></td><td>设置了粘着位（sticky bit）</td><td>f&quot;/tmp&quot;.sticky</td></tr><tr><td>file1 -nt file2</td><td>file1 比 file2 新</td><td>f&quot;file1&quot; &gt; f&quot;file2&quot;</td></tr><tr><td>file1 -ot file2</td><td>file1 比 file2 旧</td><td>f&quot;file1&quot; &lt; f&quot;file2&quot;</td></tr><tr><td>file1 -ef file2</td><td>file1 和 file2 是同一个文件（硬链接）</td><td>f&quot;file1&quot; == f&quot;file2&quot;</td></tr></tbody></table><h2 id="case" tabindex="-1"><a class="header-anchor" href="#case"><span>case</span></a></h2><h3 id="单模式匹配" tabindex="-1"><a class="header-anchor" href="#单模式匹配"><span>单模式匹配</span></a></h3><p><strong>输入：</strong></p><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$i</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">match</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    0</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is 0&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is 1&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    _</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is others&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">case</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> in</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">  0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is 0&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ;;</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">  1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is 1&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ;;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  *)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;i is others&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ;;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">esac</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多模式匹配" tabindex="-1"><a class="header-anchor" href="#多模式匹配"><span>多模式匹配</span></a></h3><p><strong>输入：</strong></p><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">match</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;apple&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;banana&quot;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;matched: apple or banana&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    _</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> =&gt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;no matched&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">case</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$x</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> in</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">  apple</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">|</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">banana</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;matched: apple or banana&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ;;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  *)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;no matched&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ;;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">esac</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通配符" tabindex="-1"><a class="header-anchor" href="#通配符"><span>通配符</span></a></h3><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select"><span>select</span></a></h2><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>为了保证跨平台，Hulo 暂不支持 select 语法。因此，为了使用原生select语法糖，你需要使用unsafe嵌入原生脚本。</p></div><p><strong>输入：</strong></p><div class="language-hulo line-numbers-mode" data-highlighter="shiki" data-ext="hulo" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\${</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">select fruit in apple banana orange</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">do</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  if [ -n &quot;$fruit&quot; ]; then</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    echo &quot;You selected: $fruit&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    break</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  else</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    echo &quot;Invalid choice&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  fi</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">done</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">select</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> fruit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> in apple banana orange</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">do</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fruit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;You selected: </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">$fruit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    break</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  else</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Invalid choice&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  fi</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">done</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,43)]))}const k=i(e,[["render",l],["__file","branch.html.vue"]]),r=JSON.parse('{"path":"/blueprints/bash/branch.html","title":"Conditional branch","lang":"en-US","frontmatter":{"title":"Conditional branch","icon":"fa-solid fa-code-branch","date":"2025-04-14T00:00:00.000Z","category":"blueprint","tag":["bash","flow"],"license":"MIT","description":"if 单分支 输入： 输出： 多分支 输入： 输出： 命令 原生集成 判断表达式 整数比较 Warning 只能用于整数 字符串判断 逻辑判断 文件相关 case 单模式匹配 输入： 输出： 多模式匹配 输入： 输出： 通配符 select Tips 为了保证跨平台，Hulo 暂不支持 select 语法。因此，为了使用原生select语法糖，你需要使...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/docs/blueprints/bash/branch.html"}],["meta",{"property":"og:site_name","content":"Hulo"}],["meta",{"property":"og:title","content":"Conditional branch"}],["meta",{"property":"og:description","content":"if 单分支 输入： 输出： 多分支 输入： 输出： 命令 原生集成 判断表达式 整数比较 Warning 只能用于整数 字符串判断 逻辑判断 文件相关 case 单模式匹配 输入： 输出： 多模式匹配 输入： 输出： 通配符 select Tips 为了保证跨平台，Hulo 暂不支持 select 语法。因此，为了使用原生select语法糖，你需要使..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-04-16T16:47:44.000Z"}],["meta",{"property":"article:tag","content":"bash"}],["meta",{"property":"article:tag","content":"flow"}],["meta",{"property":"article:published_time","content":"2025-04-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-16T16:47:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Conditional branch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-04-14T00:00:00.000Z\\",\\"dateModified\\":\\"2025-04-16T16:47:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"The Hulo Authors\\",\\"url\\":\\"https://github.com/hulo-lang\\"}]}"]]},"git":{"createdTime":1744562726000,"updatedTime":1744822064000,"contributors":[{"name":"ansurfen","username":"ansurfen","email":"axf593161@gmail.com","commits":3,"url":"https://github.com/ansurfen"}]},"readingTime":{"minutes":2.23,"words":668},"filePathRelative":"blueprints/bash/branch.md","localizedDate":"April 14, 2025","autoDesc":true}');export{k as comp,r as data};
