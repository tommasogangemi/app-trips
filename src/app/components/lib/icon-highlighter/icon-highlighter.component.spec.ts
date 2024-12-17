import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconHighlighterComponent } from './icon-highlighter.component';

describe('IconHighlighterComponent', () => {
  let component: IconHighlighterComponent;
  let fixture: ComponentFixture<IconHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
