const app = new PIXI.Application({
    width: 600,
    height: 600,
});
document.getElementById('view').appendChild(app.view);

// loading 进度条
// app.loader.onProgress.add((progress) => {
//     console.log('progress', progress.progress, progress);
// });

app.loader
    .add('heroes', 'https://raw.githubusercontent.com/xdliyushen/pixi-spine-demo/main/assets/heroes.json')
    .load((loader, res) => {
        const ele = new PIXI.spine.Spine(res.heroes.spineData);

        // 换皮肤
        function setSkinByName(skinName) {
            const skins = res.heroes.spineData.skins.map(skin => skin.name);

            if (skins.indexOf(skinName) !== -1) {
                ele.skeleton.setSkin(null);
                ele.skeleton.setSkinByName(skinName);
            } else {
                console.log('skin ' + skinName + ' not found')
            }
        }

        // 播放动作
        function setAnimation(name) {
            if (ele.state.hasAnimation(name)) {
                // 播放动画
                ele.state.setAnimation(0, name, true);
                // 修改动画播放速度
                ele.state.timeScale = 0.5;
            } else {
                console.log('animation ' + name + ' not found')
            }
        }

        // 初始皮肤和动作
        setSkinByName('Assassin');
        setAnimation('block');

        // 事件监听
        // ele.state.addListener({
        //     event: function (entry, event) { console.log('event fired ' + event.data + ' at track' + entry.trackIndex) },
        //     complete: function (entry) { console.log('track ' + entry.trackIndex + ' completed ' + entry.loopsCount() + ' times') },
        //     start: function (entry) { console.log('animation is set at ' + entry.trackIndex) },
        //     end: function (entry) { console.log('animation was ended at ' + entry.trackIndex) },
        //     dispose: function (entry) { console.log('animation was disposed at ' + entry.trackIndex) },
        //     interrupted: function (entry) { console.log('animation was interrupted at ' + entry.trackIndex) }
        // });
        // ele.state.tracks[0].listener = {
        //     complete: function (trackEntry, count) { console.log('my track completed ' + trackEntry.loopsCount() + ' times') }
        // }

        // ele.state.addListener 参数类的说明：
        // /** The interface to implement for receiving TrackEntry events. It is always safe to call AnimationState methods when receiving
        //  * events.
        //  *
        //  * See TrackEntry {@link TrackEntry#listener} and AnimationState
        //  * {@link AnimationState#addListener()}.
        //  * @public
        //  * */
        //  export interface AnimationStateListener extends IAnimationStateListener {
        //     /** Invoked when this entry has been set as the current entry. */
        //     start? (entry: TrackEntry): void;

        //     /** Invoked when another entry has replaced this entry as the current entry. This entry may continue being applied for
        //      * mixing. */
        //     interrupt? (entry: TrackEntry): void;

        //     /** Invoked when this entry is no longer the current entry and will never be applied again. */
        //     end? (entry: TrackEntry): void;

        //     /** Invoked when this entry will be disposed. This may occur without the entry ever being set as the current entry.
        //      * References to the entry should not be kept after dispose is called, as it may be destroyed or reused. */
        //     dispose? (entry: TrackEntry): void;

        //     /** Invoked every time this entry's animation completes a loop. */
        //     complete? (entry: TrackEntry): void;

        //     /** Invoked when this entry's animation triggers an event. */
        //     event? (entry: TrackEntry, event: Event): void;
        // }

        // ele.state.track[0].listener 类的说明：
        // export interface IAnimationStateListener {
        //     start? (entry: ITrackEntry): void;
        //     interrupt? (entry: ITrackEntry): void;
        //     end? (entry: ITrackEntry): void;
        //     dispose? (entry: ITrackEntry): void;
        //     complete? (entry: ITrackEntry): void;
        //     event? (entry: ITrackEntry, event: IEvent): void;
        // }

        // 调整动画位置和大小
        ele.scale.set(0.4, 0.4);
        ele.x = 300;
        ele.y = 500;

        app.stage.addChild(ele);

        // 操作下拉选项框的代码, 可以忽略
        // ==================================================
        function generateOptionsHtmlTemplate(arr) {
            return arr.reduce((prev, crrr) => {
                return prev + `<option value="${crrr}">${crrr}</option>`
            }, '');
        }

        function selectChangeHandler(e) {
            const id = e.target.id;
            const value = this.value;

            if (id === 'skin-select') {
                setSkinByName(value);
            } else if (id === 'animation-select') {
                setAnimation(value);
            }
        }

        $('#skin-select')
            .append(generateOptionsHtmlTemplate(
                res.heroes.spineData.skins.map(skin => skin.name)
            ))
            .change(selectChangeHandler)

        $('#animation-select')
            .append(generateOptionsHtmlTemplate(
                res.heroes.spineData.animations.map(animation => animation.name)
            ))
            .change(selectChangeHandler)
        // ==================================================
    });