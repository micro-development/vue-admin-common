# cd

> 切换当前用户工作目录

## 选项

### 选项aaa

- `-L`（默认值）如果要切换到的目标目录是一个符号连接，那么切换到符号连接的目录。
- `-P` 如果要切换到的目标目录是一个符号连接，那么切换到它指向的物理位置目录。

## 参数

想要进入的目标目录：支持相对路径和绝对路径。

另外还支持几个特殊参数：

- `~` 回到家目录，`~` 也可以省略不写，同样也是回到家目录。
- `-` 当前工作目录将被切换到环境变量OLDPWD所表示的目录，也就是前一个工作目录。

## 例子

进入根目录

```bash
[root@localhost ~]# cd /
[root@localhost /]#
```

> 对于 `-L` 和 `-P` 两个选项的说明，提到一个关键词：`符号链接`,其实就相当于 `windows` 中的 `快捷方式`，但还是有一些区别，后面详细再说，现在先举个例子。


下面假设我在 `/root/test` 目录下，有个目录叫 `abc` ,同时，我又在 `test` 目录下为 `abc` 创建了 软连接 （相当于快捷方式）`abc-ln`，那么通过查看到的信息，其实是有特殊标志，就像 `windows` 中也会在文件夹图标增加一个标志一样。

```bash
[root@localhost test]# pwd
/root/test
[root@localhost test]# ls -l
总用量 0
drwxr-xr-x. 2 root root 6 11月 10 01:38 abc
lrwxrwxrwx. 1 root root 4 11月 10 01:38 abc-ln -> abc/
```



> 那下面开始测试 `-L` 和 `-P` 两个选项，选项中提到使用场景是 目标目录是 符号链接，那么就是示例中的 `abc-ln` 目录。


当使用 `-P` 且进入的是 符号链接 时，最终会到 原始位置中。 
 
```bash
[root@localhost test]# cd -P abc-ln/
[root@localhost abc]# pwd
/root/test/abc
```

当使用 `-L` 且进入的是 符号链接 时，最终会到 符号链接位置。 （默认值）

```bash
[root@localhost test]# cd -L abc-ln/
[root@localhost abc-ln]# pwd
/root/test/abc-ln
```

`cd -` 回到上一个进入的目录，注意：这个不是回退哦。

```bash
[root@localhost test]# cd abc
[root@localhost abc]# cd -
/root/test
[root@localhost test]# cd -
/root/test/abc
[root@localhost abc]# cd -
/root/test
```

> 也就是说，当前进入的目录，就是下一次 `cd -` 所要执行的结果。